import { cookies } from "next/headers";

export const client = (input: string | URL | Request, init?: RequestInit) => {
  const headers = new Headers(init?.headers);
  headers.append("Content-Type", "application/json");

  const sessionId = cookies().get("sessionid")?.value;
  if (sessionId) {
    headers.append("Authorization", `Token ${sessionId}`);
  }

  return fetch(`${process.env.API_URL}${input}`, {
    ...init,
    headers,
  });
};
