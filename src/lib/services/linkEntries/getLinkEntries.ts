import { db } from "@/db";
import { count, eq, getTableColumns, ilike, like, or, sum } from "drizzle-orm";
import {
  linkEntries,
  tags,
  tagsToLinkEntries,
  users,
  votesToLinkEntries,
} from "@/db/schema";
import { LinkEntry } from "./types";
import { unstable_cache } from "next/cache";

type GetLinkEntriesParams = {
  limit: number;
  offset: number;
  tag?: string;
  search?: string;
};

type GetLinkEntriesResponse = {
  data: LinkEntry[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
};

const baseLinkEntriesQuery = db
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

async function getLinkEntriesQuery({
  search,
  limit = 20,
  offset = 0,
  tag,
}: GetLinkEntriesParams): Promise<GetLinkEntriesResponse> {
  const [{ value: total }] = await db
    .select({ value: count() })
    .from(linkEntries);

  let query = baseLinkEntriesQuery;

  if (tag) {
    // TODO find a way how to fix those types for built queries
    // @ts-ignore-next-line
    query = getSubQueryWithTag(tag);
  }

  if (search) {
    // TODO find a way how to fix those types for built queries
    // @ts-ignore-next-line
    query = query.where(({ title, description }) =>
      or(ilike(title, `%${search}%`), like(description, `%${search}%`)),
    );
  }

  const dataResult = await db
    .select({
      ...getTableColumns(linkEntries),
      user: { ...getTableColumns(users) },
      tags: { ...getTableColumns(tags) },
      score: sum(votesToLinkEntries.vote),
    })
    .from(query.limit(limit).offset(offset).as("linkEntries"))
    .leftJoin(users, eq(linkEntries.userId, users.id))
    .innerJoin(
      tagsToLinkEntries,
      eq(tagsToLinkEntries.linkEntryId, linkEntries.id),
    )
    .innerJoin(tags, eq(tagsToLinkEntries.tagId, tags.id))
    .leftJoin(
      votesToLinkEntries,
      eq(votesToLinkEntries.linkEntryId, linkEntries.id),
    )
    .groupBy(
      linkEntries.id,
      linkEntries.title,
      linkEntries.description,
      linkEntries.url,
      linkEntries.thumbnailUrl,
      linkEntries.userId,
      linkEntries.createdAt,
      users.id,
      tags.id,
      tags.name,
    );

  const data = Object.values(
    dataResult.reduce<Record<number, any>>((acc, next) => {
      const previousTags = !!acc[next.id] ? acc[next.id].tags : [];

      return {
        ...acc,
        [next.id]: {
          ...next,
          user: next.user,
          tags: [...previousTags, next.tags],
          score: Number(next.score) || 0,
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

// TODO can't wait to get rid of this :S
export const getLinkEntries = unstable_cache(
  async (params: GetLinkEntriesParams) => getLinkEntriesQuery(params),
  ["linkEntries"],
  {
    tags: ["linkEntries"],
  },
);
