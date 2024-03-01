import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  Item,
  MultiSelect,
  MultiSelectProps,
} from "@/components/ui/multiselect";

type MultiSelectFieldProps<
  TItems extends Item[],
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
  Omit<MultiSelectProps<TItems>, "onChange"> & {
    label: string;
  };

export const MultiSelectField = <
  TItems extends Item[],
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  items,
  label,
  placeholder,
  control,
}: MultiSelectFieldProps<TItems, TFieldValues, TName>) => (
  <FormField
    name={name}
    control={control}
    render={({ field: { onChange, ref } }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <MultiSelect
            ref={ref}
            items={items}
            placeholder={placeholder}
            onChange={(items) => onChange(items)}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
