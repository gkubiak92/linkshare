import { User } from "@/lib/services/users/types";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/services/auth/utils";

export async function getUserData(): Promise<{ user: User | null }> {
  const session = cookies().get("session");

  if (!session) {
    return { user: null };
  }

  const userData = await decrypt(session.value);

  return {
    ...userData,
  };
}
