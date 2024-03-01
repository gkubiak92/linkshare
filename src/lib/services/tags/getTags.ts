import { Tag } from "./types";
import { db } from "@/db";
import { tags } from "@/db/schema";

export type GetTagsResponse = {
  tags: Tag[];
};

export async function getTags() {
  const data = await db.select({ id: tags.id, name: tags.name }).from(tags);

  return { data };
}
