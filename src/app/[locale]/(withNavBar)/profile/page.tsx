import { getUserData } from "@/lib/services/users/getUserData";
import { redirect } from "next/navigation";
import { routes } from "@/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTranslations } from "next-intl/server";

export default async function Profile() {
  const t = await getTranslations("profile");
  const { user } = await getUserData();

  if (!user) {
    return redirect(routes.login);
  }

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div>
          <Avatar className="w-44 h-44">
            {user.image ? (
              <AvatarImage
                src={user.image}
                alt="user profile image"
                width={128}
                height={128}
              />
            ) : (
              <AvatarFallback />
            )}
          </Avatar>
        </div>
        <div>
          <form className="w-80 flex flex-col gap-4">
            <div>
              <Label htmlFor="username">{t("form.email.label")}</Label>
              <Input disabled name="email" id="email" value={user.email} />
            </div>
            <div>
              <Label htmlFor="username">{t("form.username.label")}</Label>
              <Input disabled name="username" id="username" value={user.name} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
