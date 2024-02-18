"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/link/Link";
import { routes } from "@/routes";
import { SubmitButton } from "@/components/form/submitButton/SubmitButton";
import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import { onSubmit } from "./actions";
import { LoginErrors } from "@/lib/services/auth/login/login";

const errorsMap: Record<LoginErrors, string> = {
  INVALID_CREDENTIALS: "errors.invalidCredentials",
};

export default function LoginPage() {
  const t = useTranslations("login");
  const [message, formAction] = useFormState(onSubmit, "");

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 min-h-full">
      <div className="flex flex-col justify-center items-center px-8 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          {t("title")}
        </h1>
        <form action={formAction}>
          <div className="mb-4">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <SubmitButton className="block mb-12" variant="outline">
            {t("submitButton")}
          </SubmitButton>
          {!!message && (
            <p className="block text-red-600 mb-4">{t(errorsMap[message])}</p>
          )}
          <Link href={routes.register} className="underline">
            {t("dontHaveAccount")}
          </Link>
        </form>
      </div>
      <div className="hidden md:block bg-primary" />
    </div>
  );
}
