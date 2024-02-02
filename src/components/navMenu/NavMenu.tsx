import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import Link from "next/link";

export const NavMenu = () => (
  <nav className="relative top-0 left-0 right-0 px-24 py-2 flex items-center gap-4 shadow-xl">
    <Link className="block text-2xl text-zinc-900 py-2" href={routes.root}>
      Linkshare
    </Link>
    <Input className="block max-w-screen-sm mx-auto" placeholder="Search..." />
    <div className="flex gap-4 items-center">
      <Button asChild variant="outline">
        <Link href={routes.login}>Login</Link>
      </Button>
      <Button asChild>
        <Link href={routes.register}>Register</Link>
      </Button>
    </div>
  </nav>
);
