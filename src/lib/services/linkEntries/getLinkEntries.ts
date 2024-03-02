import { db } from "@/db";
import { count, eq, getTableColumns, ilike, or, sum } from "drizzle-orm";
import {
  linkEntries,
  tags,
  tagsToLinkEntries,
  users,
  votesToLinkEntries,
} from "@/db/schema";
import { LinkEntry } from "./types";
import { unstable_cache } from "next/cache";
import { PgSelect } from "drizzle-orm/pg-core";
import { withPagination } from "@/lib/services/utils";

type GetLinkEntriesParams = {
  page: number;
  pageSize: number;
  tag?: string;
  search?: string;
};

type GetLinkEntriesResponse = {
  data: LinkEntry[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
};

const baseLinkEntriesQuery = db
  .selectDistinct(getTableColumns(linkEntries))
  .from(linkEntries)
  .$dynamic();

const getSubQueryWithTag = (tag: string) =>
  db
    .selectDistinct({ ...getTableColumns(linkEntries), tagName: tags.name })
    .from(linkEntries)
    .innerJoin(
      tagsToLinkEntries,
      eq(tagsToLinkEntries.linkEntryId, linkEntries.id),
    )
    .innerJoin(tags, eq(tagsToLinkEntries.tagId, tags.id))
    .where(({ tagName }) => eq(tagName, tag))
    .$dynamic();

const withSearch = <QueryBuilder extends PgSelect>(
  qb: QueryBuilder,
  search: string,
) =>
  qb.where(({ title, description }) =>
    or(ilike(title, `%${search}%`), ilike(description, `%${search}%`)),
  );

async function getLinkEntriesQuery({
  search,
  page,
  pageSize,
  tag,
}: GetLinkEntriesParams): Promise<GetLinkEntriesResponse> {
  const [{ value: total }] = await db
    .select({ value: count() })
    .from(linkEntries);

  let query = baseLinkEntriesQuery;

  if (tag) {
    query = getSubQueryWithTag(tag);
  }

  if (search) {
    query = withSearch(query, search);
  }

  query = withPagination(query, page, pageSize);

  const dataResult = await db
    .select({
      ...getTableColumns(linkEntries),
      user: { ...getTableColumns(users) },
      tags: { ...getTableColumns(tags) },
      score: sum(votesToLinkEntries.vote),
    })
    .from(query.as("linkEntries"))
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

  const groupedEntriesById = dataResult.reduce<Record<number, LinkEntry>>(
    (acc, next) => {
      const previousTags = !!acc[next.id] ? acc[next.id].tags : [];

      if (!next.user) {
        return { ...acc };
      }

      return {
        ...acc,
        [next.id]: {
          ...next,
          user: next.user,
          tags: [...previousTags, next.tags],
          score: Number(next.score) || 0,
        },
      };
    },
    {},
  );

  const data = Object.values(groupedEntriesById);

  return {
    data,
    pagination: {
      page,
      pageSize,
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
