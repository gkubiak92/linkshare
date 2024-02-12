import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/link/Link";
import { routes } from "@/routes";
import { getTranslations } from "next-intl/server";
import { login } from "@/api/auth/login";
import { redirect } from "@/i18n/navigation";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const t = await getTranslations("login");

  async function onSubmit(formData: FormData) {
    "use server";
    const credentials = {
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    const { key } = await login(credentials);
    cookies().set("sessionid", key, { httpOnly: true });

    redirect(routes.root);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 min-h-full">
      <div className="flex flex-col justify-center items-center px-8 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          {t("title")}
        </h1>
        <form action={onSubmit}>
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
