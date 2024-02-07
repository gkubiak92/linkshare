import { client } from "@/api/client";

export type Tag = {
  tag: string;
  num_res: number;
};

type GetTagsParams = {
  page: number;
  perPage?: number;
  tag?: string;
  assigned?: string;
  ordering?: "-num_res" | "num_res";
  search?: string;
};

type GetTagsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Tag[];
};

export async function getTags({
  page,
  perPage,
  ...params
}: GetTagsParams): Promise<GetTagsResponse> {
  const searchParams = new URLSearchParams({
    ...params,
    page: page.toString(),
  });

  if (perPage) {
    searchParams.set("per_page", perPage.toString());
  }

  const res = await client(`/tags?${searchParams}`);

  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }

  return res.json();
}
