"use client";

import { Input, InputProps } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { routes } from "@/routes";

type SearchBarProps = Omit<InputProps, "className"> & { className?: string };

const schema = z.object({
  search: z.string(),
});

type SearchFormValues = z.infer<typeof schema>;

export function SearchBar({ className, ...inputProps }: SearchBarProps) {
  const t = useTranslations("navBar");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultSearch = searchParams.get("search") || "";

  const { register, handleSubmit, setValue } = useForm<SearchFormValues>({
    defaultValues: {
      search: defaultSearch,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ search }: SearchFormValues) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", search);

    // Redirect search results to main page if it's used from different route than links
    const currentPage = pathname.substring(pathname.indexOf("/", 1)) as string;
    const path =
      currentPage.startsWith(routes.links.root) ||
      currentPage.startsWith(routes.links.tags)
        ? pathname
        : routes.links.root;

    router.push(`${path}?${params}`);
  };

  useEffect(() => {
    setValue("search", defaultSearch);
  }, [defaultSearch, setValue]);

  return (
    <div className={cn("block max-w-screen-sm mx-auto", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder={t("search")}
          {...inputProps}
          {...register("search")}
        />
      </form>
    </div>
  );
}
