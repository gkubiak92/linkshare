import { Tag } from "./types";
import { db } from "@/db";
import { tags, tagsToLinkEntries } from "@/db/schema";
import { count, desc, eq, getTableColumns } from "drizzle-orm";

type GetTrendingTagsParams = {
  limit?: number;
};

type GetTrendingTagsResponse = {
  data: Array<Tag & { tagUsageCount: number }>;
};

const TAGS_COUNT = 50;

export async function getTrendingTags(
  params?: GetTrendingTagsParams,
): Promise<GetTrendingTagsResponse> {
  const limit = params?.limit || TAGS_COUNT;

  const data = await db
    .select({
      ...getTableColumns(tags),
      tagUsageCount: count(tagsToLinkEntries.tagId),
    })
    .from(tags)
    .leftJoin(tagsToLinkEntries, eq(tags.id, tagsToLinkEntries.tagId))
    .groupBy(tags.id, tags.name)
    .orderBy(({ tagUsageCount }) => desc(tagUsageCount))
    .limit(limit);

  return {
    data,
  };
}
