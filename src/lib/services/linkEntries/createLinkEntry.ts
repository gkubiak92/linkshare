"use server";

import { LinkEntry } from "@/lib/services/linkEntries/types";
import { getUserData } from "@/lib/services/users/getUserData";
import { db } from "@/db";
import { linkEntries, tags, tagsToLinkEntries } from "@/db/schema";

export type CreateLinkEntryParams = Pick<
  LinkEntry,
  "title" | "description" | "thumbnailUrl" | "url"
> & { tags: string };

type CreateLinkEntryResponse = {
  data: {
    id: string;
  };
};

export async function createLinkEntry(
  entry: CreateLinkEntryParams,
): Promise<CreateLinkEntryResponse> {
  const { user } = await getUserData();

  if (!user) {
    throw new Error("NOT AUTHORIZED");
  }

  try {
    const result = await db
      .insert(linkEntries)
      .values({
        ...entry,
        userId: user.id,
      })
      .returning({ id: linkEntries.id });

    const tagEntries = entry.tags.toLowerCase().split(",");

    // TODO insert only unique tags
    const insertedTags = await db
      .insert(tags)
      .values(tagEntries.map((tag) => ({ name: tag.trim() })))
      .returning({ id: tags.id });

    await db.insert(tagsToLinkEntries).values(
      insertedTags.map((insertedTag) => ({
        linkEntryId: result[0].id,
        tagId: insertedTag.id,
      })),
    );

    return {
      data: {
        id: result[0].id.toString(),
      },
    };
  } catch (e) {
    throw new Error("COULD NOT CREATE");
  }
}
