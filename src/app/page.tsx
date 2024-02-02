import { NavMenu } from "@/components/navMenu/NavMenu";

export default function Home() {
  return (
    <>
      <NavMenu />
      <main className="flex flex-col justify-between p-24">
        <h2 className="text-4xl">All entries</h2>
      </main>
    </>
  );
}
