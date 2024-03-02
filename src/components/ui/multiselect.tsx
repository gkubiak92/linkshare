"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  ReactNode,
  Ref,
  RefAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslations } from "next-intl";

export type Item = {
  label: string;
  value: string | number | null;
};

function fixedForwardRef<T, P = {}>(
  render: (props: P, ref: Ref<T>) => ReactNode,
): (props: P & RefAttributes<T>) => ReactNode {
  return forwardRef(render) as any;
}

export type MultiSelectProps<TItems extends Item[]> = {
  items: TItems;
  placeholder?: string;
  onChange: (items: Item[]) => void;
};

const MultiSelectBase = <TItems extends Item[]>(
  { items, placeholder, onChange }: MultiSelectProps<TItems>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const t = useTranslations("multiselect");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const handleUnselect = useCallback((item: Item) => {
    setSelected((prev) => prev.filter((s) => s.value !== item.value));
  }, []);

  const selectables = items.filter(
    (item) =>
      !selected.some(
        (selected) => selected.label.toLowerCase() === item.label.toString(),
      ),
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (inputValue === "") {
        setSelected((prev) => {
          const newSelected = [...prev];
          newSelected.pop();
          return newSelected;
        });
      }
    }
  };

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((item) => (
            <Badge key={`${item.label}${item.value}`} variant="secondary">
              {item.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(item);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={ref}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="max-h-60 overflow-auto">
              {!!inputValue &&
                !selectables.some(({ label }) => label === inputValue) &&
                !selected.some(({ label }) => label === inputValue) && (
                  <CommandItem
                    key={inputValue}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [
                        ...prev,
                        { label: inputValue, value: null },
                      ]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {t("addOption", { value: inputValue })}
                  </CommandItem>
                )}
              {selectables.map((item) => (
                <CommandItem
                  key={item.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={(value) => {
                    setInputValue("");
                    setSelected((prev) => [...prev, item]);
                  }}
                  className={"cursor-pointer"}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

export const MultiSelect = fixedForwardRef(MultiSelectBase);
