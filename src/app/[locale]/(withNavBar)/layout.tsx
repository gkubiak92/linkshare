import { ReactNode } from "react";
import { NavMenu } from "@/components/navMenu/NavMenu";

type LayoutWithNavbarProps = {
  children: ReactNode;
};

export default async function LayoutWithNavBar({
  children,
}: LayoutWithNavbarProps) {
  return (
    <>
      <NavMenu />
      <main className="flex flex-col justify-between p-8 md:p-24">
        {children}
      </main>
    </>
  );
}
