import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/components/link/Link";
import { getTranslations } from "next-intl/server";
import { User } from "@/lib/services/users/types";
import { getUserData } from "@/lib/services/users/getUserData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SearchBar } from "./searchBar/SearchBar";

export async function NavMenu() {
  const t = await getTranslations("navBar");

  const { user } = await getUserData();
  const isLoggedIn = !!user;

  const logout = async () => {
    "use server";
    cookies().delete("session");

    return redirect(routes.root);
  };

  return (
    <nav className="relative top-0 left-0 right-0 px-4 md:px-24 py-2 flex items-center gap-4 shadow-xl">
      <Link
        className="block text-sm md:text-2xl text-zinc-900 py-2"
        href={routes.root}
      >
        Linkshare
      </Link>
      <SearchBar className="flex-1" />
      <div className="hidden md:flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <Button asChild variant="link">
              <Link href={routes.profile}>{t("myProfile")}</Link>
            </Button>
            <form action={logout}>
              <Button type="submit" variant="outline">
                {t("logout")}
              </Button>
            </form>
          </>
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
            {user?.image && <AvatarImage src={user.image} />}
            <AvatarFallback>
              {/* TODO remove casting once user fetching is implemented*/}
              {user ? (user as User).name[0].toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          {isLoggedIn ? (
            <>
              <Link href={routes.profile}>
                <DropdownMenuItem className="cursor-pointer">
                  {t("myProfile")}
                </DropdownMenuItem>
              </Link>
              <form action={logout}>
                <DropdownMenuItem className="cursor-pointer">
                  <Button
                    type="submit"
                    variant="ghost"
                    className="p-0 h-auto font-normal"
                  >
                    {t("logout")}
                  </Button>
                </DropdownMenuItem>
              </form>
            </>
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
}
