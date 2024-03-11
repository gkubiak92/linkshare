import { db } from "@/db";
import { and, count, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import {
  linkEntries,
  tags,
  tagsToLinkEntries,
  users,
  votesToLinkEntries,
} from "@/db/schema";
import { LinkEntry } from "./types";
import { unstable_cache } from "next/cache";
import { alias, PgSelect } from "drizzle-orm/pg-core";
import { withPagination } from "@/lib/services/utils";
import { getUserData } from "@/lib/services/users/getUserData";
import { Vote } from "@/lib/services/linkEntries/voteOnLinkEntry";

type GetLinkEntriesParams = {
  page: number;
  pageSize: number;
  tag?: string;
  search?: string;
};

type GetLinkEntriesResponse = {
  data: Array<Omit<LinkEntry, "tags"> & { tags: string[] }>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
};

const linkEntriesColumns = getTableColumns(linkEntries);

const baseLinkEntriesQuery = db
  .select(linkEntriesColumns)
  .from(linkEntries)
  .$dynamic();

const getSubQueryWithTag = (tag: string) =>
  db
    .selectDistinct({ ...linkEntriesColumns, tagName: tags.name })
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
  const { user } = await getUserData();

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

  const vtle = alias(votesToLinkEntries, "vtle");

  const data = await db
    .select({
      ...linkEntriesColumns,
      user: getTableColumns(users),
      tags: sql`string_agg(${tags.name}, ',')`,
      userVote: sql`coalesce(vtle.vote, 0)`,
    })
    .from(query.as("linkEntries"))
    .leftJoin(users, eq(linkEntries.userId, users.id))
    .leftJoin(
      tagsToLinkEntries,
      eq(linkEntries.id, tagsToLinkEntries.linkEntryId),
    )
    .leftJoin(tags, eq(tags.id, tagsToLinkEntries.tagId))
    .leftJoin(
      vtle,
      and(
        !!user ? eq(vtle.userId, user?.id) : undefined,
        eq(vtle.linkEntryId, linkEntries.id),
      ),
    )
    .groupBy(...Object.values(linkEntriesColumns), users.id, vtle.vote);

  return {
    data: data.map((linkEntry) => ({
      ...linkEntry,
      user: linkEntry.user!,
      userVote: linkEntry.userVote as Vote,
      tags: (linkEntry.tags as string).split(","),
    })),
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
