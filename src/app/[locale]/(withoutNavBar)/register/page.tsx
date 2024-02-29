"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { redirect } from "next/navigation";
import { onSubmit } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/form/textField/TextField";

const schema = z
  .object({
    email: z.string().email({ message: "notEmail" }),
    username: z.string(),
    password: z.string().min(8, { message: "passwordTooShort" }),
    repeatPassword: z.string(),
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    message: "passwordsDontMatch",
    path: ["repeatPassword"],
  });

export type RegisterFormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const t = useTranslations("register");
  const tErrors = useTranslations("validators");

  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (data: RegisterFormValues) =>
    startTransition(async () => {
      const { user } = await onSubmit(data);

      if (!!user) {
        toast({
          title: t("successToast.title"),
          description: t("successToast.description"),
        });
        redirect(routes.root);
      }
    });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 min-h-full">
      <div className="flex flex-col justify-center items-center p-8 sm:p-24 md:p-12 lg:p-24">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          {t("title")}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="min-w-full"
          >
            <div className="flex flex-col gap-4 my-4">
              <TextField
                name="email"
                label={t("email.label")}
                placeholder={t("email.placeholder")}
              />
              <TextField
                name="username"
                label={t("username.label")}
                placeholder={t("username.placeholder")}
              />
              <TextField
                name="password"
                type="password"
                label={t("password.label")}
                placeholder={t("password.placeholder")}
              />
              <TextField
                name="repeatPassword"
                type="password"
                label={t("repeatPassword.label")}
                placeholder={t("repeatPassword.placeholder")}
              />
            </div>
            <Button
              type="submit"
              className="block mb-12"
              variant="outline"
              disabled={!form.formState.isValid || isPending}
            >
              {t("submitButton")}
            </Button>
            <Link href={routes.login} className="underline">
              {t("alreadyHaveAnAccount")}
            </Link>
          </form>
        </Form>
      </div>
      <div className="hidden md:block bg-primary" />
    </div>
  );
}
