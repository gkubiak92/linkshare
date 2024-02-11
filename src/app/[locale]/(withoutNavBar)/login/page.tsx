import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/link/Link";
import { routes } from "@/routes";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("login");

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 min-h-full">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          {t("title")}
        </h1>
        <form>
          <div className="mb-4">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input id="email" name="email" />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <Button type="submit" className="block mb-12" variant="outline">
            {t("submitButton")}
          </Button>
          <Link href={routes.register} className="underline">
            {t("dontHaveAccount")}
          </Link>
        </form>
      </div>
      <div className="hidden md:block bg-primary" />
    </div>
  );
}
