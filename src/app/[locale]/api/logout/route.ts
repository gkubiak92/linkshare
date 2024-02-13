import { logout } from "@/api/auth/logout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/routes";

export async function GET() {
  await logout();

  cookies().delete("sessionid");

  return redirect(routes.root);
}
