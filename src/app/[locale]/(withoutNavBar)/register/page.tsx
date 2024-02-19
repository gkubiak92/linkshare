"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
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
        <form onSubmit={handleSubmit(onSubmitHandler)} className="min-w-full">
          <div className="mb-4">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input id="email" {...register("email")} />
            {!!errors.email && <p>{tErrors(errors.email.message)}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="username">{t("usernameLabel")}</Label>
            <Input id="username" {...register("username")} />
            {!!errors.username && <p>{tErrors(errors.username.message)}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Input id="password" type="password" {...register("password")} />
            {!!errors.password && <p>{tErrors(errors.password.message)}</p>}
          </div>
          <div className="mb-6">
            <Label htmlFor="repeatPassword">{t("repeatPasswordLabel")}</Label>
            <Input
              id="repeatPassword"
              type="password"
              {...register("repeatPassword")}
            />
            {!!errors.repeatPassword && (
              <p>{tErrors(errors.repeatPassword.message)}</p>
            )}
          </div>
          <Button
            type="submit"
            className="block mb-12"
            variant="outline"
            disabled={!isValid || isPending}
          >
            {t("submitButton")}
          </Button>
          <Link href={routes.login} className="underline">
            {t("alreadyHaveAnAccount")}
          </Link>
        </form>
      </div>
      <div className="hidden md:block bg-primary" />
    </div>
  );
}
