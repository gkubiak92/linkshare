import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/routes";

export default function LoginPage() {
  // async function login(formData: FormData) {
  //   "use server";
  //
  //   const rawFormData = {
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   };
  //
  // const res = await fetch(`${process.env.API_URL}/auth/login`, {
  //   method: "POST",
  //   body: rawFormData,
  // });
  //
  // console.log(res);
  // }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 min-h-full">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          Welcome!
        </h1>
        <form>
          <div className="mb-4">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <Button type="submit" className="block mb-12" variant="outline">
            Login
          </Button>
          <Link href={routes.register} className="underline">
            {"Don't have an account? Register here"}
          </Link>
        </form>
      </div>
      <div className="hidden md:block bg-primary" />
    </div>
  );
}
