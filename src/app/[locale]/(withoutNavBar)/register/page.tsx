import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { routes } from "@/routes";
import { Link } from "@/i18n/navigation";

export default async function RegisterPage() {
  const t = await getTranslations("register");

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 min-h-full">
      <div className="flex flex-col justify-center items-center p-8 sm:p-24 md:p-12 lg:p-24">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          {t("title")}
        </h1>
        <form className="min-w-full">
          <div className="mb-4">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <div className="mb-6">
            <Label htmlFor="repeatPassword">{t("repeatPasswordLabel")}</Label>
            <Input id="repeatPassword" name="repeatPassword" type="password" />
          </div>
          <Button type="submit" className="block mb-12" variant="outline">
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
