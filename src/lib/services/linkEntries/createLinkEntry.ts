"use server";

import { LinkEntry } from "@/lib/services/linkEntries/types";
import { getUserData } from "@/lib/services/users/getUserData";
import { db } from "@/db";
import { linkEntries, tags, tagsToLinkEntries } from "@/db/schema";

export type CreateLinkEntryParams = Pick<
  LinkEntry,
  "title" | "description" | "thumbnailUrl" | "url"
> & { tags: { chosen: string[]; added: string[] } };

export type CreateLinkEntryResponse = {
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

    const { chosen: chosenTagsIds, added: addedTags } = entry.tags;

    // TODO insert only unique tags
    const insertedTags = await db
      .insert(tags)
      .values(addedTags.map((tag) => ({ name: tag.trim() })))
      .returning({ id: tags.id });

    const insertedTagsIds = insertedTags.map(({ id }) => id);

    await db.insert(tagsToLinkEntries).values(
      [...chosenTagsIds, ...insertedTagsIds].map((tagId) => ({
        linkEntryId: result[0].id,
        tagId: Number(tagId),
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
