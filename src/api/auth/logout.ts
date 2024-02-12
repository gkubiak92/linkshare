import { client } from "@/api/client";

export async function logout(): Promise<void> {
  const res = await client("/auth/logout/", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to logout");
  }

  return res.json();
}
