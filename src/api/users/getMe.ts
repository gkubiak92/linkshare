import { client } from "@/api/client";

type GetMeResponse = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  is_admin: boolean;
} | null;

export const GET_ME_TAG = "me";

export async function getMe(): Promise<GetMeResponse> {
  const response = await client("/users/me", {
    next: {
      tags: [GET_ME_TAG],
    },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to get user data");
  }

  return response.json();
}
