import { logout } from "@/api/auth/logout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/routes";
import { revalidateTag } from "next/cache";
import { GET_ME_TAG } from "@/api/users/getMe";

export async function GET() {
  await logout();

  cookies().delete("sessionid");
  revalidateTag(GET_ME_TAG);

  return redirect(routes.root);
}
