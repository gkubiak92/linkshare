import { client } from "@/api/client";

export type LoginParams = {
  username: string;
  password: string;
};

type LoginResponse = {
  key: string;
};

export async function login(params: LoginParams): Promise<LoginResponse> {
  const response = await client("/auth/login/", {
    method: "POST",
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
}
