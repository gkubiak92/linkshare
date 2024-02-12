import { cookies } from "next/headers";

export async function getSession() {
  cookies().get("sessionid");
}
