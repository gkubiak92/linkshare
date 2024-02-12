import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRoutes, routes } from "@/routes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/components/link/Link";
import { getTranslations } from "next-intl/server";
import { getMe } from "@/api/users/getMe";

export const NavMenu = async () => {
  const user = await getMe();
  const isLoggedIn = !!user;
  const t = await getTranslations("navBar");

  return (
    <nav className="relative top-0 left-0 right-0 px-4 md:px-24 py-2 flex items-center gap-4 shadow-xl">
      <Link
        className="block text-sm md:text-2xl text-zinc-900 py-2"
        href={routes.root}
      >
        Linkshare
      </Link>
      <Input
        className="block max-w-screen-sm mx-auto"
        placeholder={t("search")}
      />
      <div className="hidden md:flex gap-4 items-center">
        {isLoggedIn ? (
          <Button asChild variant="outline">
            <Link href={apiRoutes.logout}>{t("logout")}</Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="outline">
              <Link href={routes.login}>{t("login")}</Link>
            </Button>
            <Button asChild>
              <Link href={routes.register}>{t("register")}</Link>
            </Button>
          </>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="block md:hidden">
          <Avatar>
            <AvatarFallback>
              {user ? user.username[0].toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          {isLoggedIn ? (
            <Link href={apiRoutes.logout}>
              <DropdownMenuItem className="cursor-pointer">
                {t("logout")}
              </DropdownMenuItem>
            </Link>
          ) : (
            <>
              <Link href={routes.login}>
                <DropdownMenuItem className="cursor-pointer">
                  {t("login")}
                </DropdownMenuItem>
              </Link>
              <Link href={routes.register}>
                <DropdownMenuItem className="cursor-pointer">
                  {t("register")}
                </DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
