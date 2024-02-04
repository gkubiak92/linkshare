import { User } from "@/api/api.types";
import { client } from "@/api/client";

export type LinkEntry = {
  id: number;
  url: string;
  title: string;
  description: string;
  resource_url: string;
  thumbnail: string | null;
  user: User;
  tags: string[];
  user_vote: boolean | null;
  score: number;
  created_at: string;
};

type GetEntriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: LinkEntry[];
};

export async function getEntries(page = 1): Promise<GetEntriesResponse> {
  const res = await client(`/resources?page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch entries");
  }

  return res.json();
}
