import { db } from "@/db";
import { count, eq, getTableColumns, sum } from "drizzle-orm";
import {
  linkEntries,
  tags,
  tagsToLinkEntries,
  users,
  votesToLinkEntries,
} from "@/db/schema";
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
