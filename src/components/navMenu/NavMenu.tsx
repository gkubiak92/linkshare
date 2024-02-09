import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavMenu = () => (
  <nav className="relative top-0 left-0 right-0 px-4 md:px-24 py-2 flex items-center gap-4 shadow-xl">
    <Link
      className="block text-sm md:text-2xl text-zinc-900 py-2"
      href={routes.root}
    >
      Linkshare
    </Link>
    <Input className="block max-w-screen-sm mx-auto" placeholder="Search..." />
    <div className="hidden md:flex gap-4 items-center">
      <Button asChild variant="outline">
        <Link href={routes.login}>Login</Link>
      </Button>
      <Button asChild>
        <Link href={routes.register}>Register</Link>
      </Button>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger className="block md:hidden">
        <Avatar>
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <Link href={routes.login}>
          <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
        </Link>
        <Link href={routes.register}>
          <DropdownMenuItem className="cursor-pointer">
            Register
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
);
