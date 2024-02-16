import { db } from "@/db";
import { count, eq, getTableColumns } from "drizzle-orm";
import { linkEntries, tags, tagsToLinkEntries, users } from "@/db/schema";
import { LinkEntry } from "./types";

type GetLinkEntriesParams = {
  limit: number;
  offset: number;
  tag?: string;
};

type GetLinkEntriesResponse = {
  data: LinkEntry[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
};

const subQuery = db
  .selectDistinct(getTableColumns(linkEntries))
  .from(linkEntries);

const getSubQueryWithTag = (tag: string) =>
  db
    .selectDistinct({ ...getTableColumns(linkEntries), tagName: tags.name })
    .from(linkEntries)
    .innerJoin(
      tagsToLinkEntries,
      eq(tagsToLinkEntries.linkEntryId, linkEntries.id),
    )
    .innerJoin(tags, eq(tagsToLinkEntries.tagId, tags.id))
    .where(({ tagName }) => eq(tagName, tag));

export async function getLinkEntries({
  limit = 20,
  offset = 0,
  tag,
}: GetLinkEntriesParams): Promise<GetLinkEntriesResponse> {
  const [{ value: total }] = await db
    .select({ value: count() })
    .from(linkEntries);

  const query = !!tag ? getSubQueryWithTag(tag) : subQuery;

  const dataResult = await db
    .select()
    .from(query.limit(limit).offset(offset).as("linkEntries"))
    .leftJoin(users, eq(linkEntries.userId, users.id))
    .innerJoin(
      tagsToLinkEntries,
      eq(tagsToLinkEntries.linkEntryId, linkEntries.id),
    )
    .innerJoin(tags, eq(tagsToLinkEntries.tagId, tags.id));

  const data = Object.values(
    dataResult.reduce<Record<number, any>>((acc, next) => {
      const previousTags = !!acc[next.linkEntries.id]
        ? acc[next.linkEntries.id].tags
        : [];

      return {
        ...acc,
        [next.linkEntries.id]: {
          ...next.linkEntries,
          user: next.users,
          tags: [...previousTags, next.tags],
        },
      };
    }, {}),
  );

  return {
    data,
    pagination: {
      limit,
      offset,
      total,
    },
  };
}
