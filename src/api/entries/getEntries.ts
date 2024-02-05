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

type GetEntriesParams = {
  page: number;
  perPage?: number;
  tags?: string;
};

type GetEntriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: LinkEntry[];
};

export async function getEntries({
  page,
  perPage,
  tags,
}: GetEntriesParams): Promise<GetEntriesResponse> {
  const searchParams = new URLSearchParams({ page: page.toString() });

  if (perPage) {
    searchParams.set("per_page", perPage.toString());
  }

  if (tags) {
    searchParams.set("tags", tags);
  }

  const res = await client(`/resources?${searchParams}`);

  if (!res.ok) {
    throw new Error("Failed to fetch entries");
  }

  return res.json();
}
