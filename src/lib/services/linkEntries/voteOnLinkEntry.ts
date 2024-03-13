import { db } from "@/db";
import { votesToLinkEntries } from "@/db/schema";
import { getUserData } from "@/lib/services/users/getUserData";
import { and, eq } from "drizzle-orm";

/**
 * Vote union type
 * -1 = dislike,
 * 0 = revert vote,
 * 1 = like
 */
export type Vote = -1 | 0 | 1;

export type VoteOnLinkEntryParams = {
  linkEntryId: number;
  vote: Vote;
};

export type VoteOnLinkEntryResponse = {
  data: {
    id: number;
    vote: Vote;
  };
};

export default async function voteOnLinkEntry({
  linkEntryId,
  vote,
}: VoteOnLinkEntryParams): Promise<VoteOnLinkEntryResponse> {
  const { user } = await getUserData();

  if (!user) {
    throw new Error("Action not allowed");
  }

  const existingVoteResult = await db
    .select()
    .from(votesToLinkEntries)
    .where(
      and(
        eq(votesToLinkEntries.linkEntryId, linkEntryId),
        eq(votesToLinkEntries.userId, user.id),
      ),
    );

  if (existingVoteResult[0]) {
    const result = await db
      .update(votesToLinkEntries)
      .set({ vote })
      .where(
        and(
          eq(votesToLinkEntries.linkEntryId, linkEntryId),
          eq(votesToLinkEntries.userId, user.id),
        ),
      )
      .returning({ id: votesToLinkEntries.id, vote: votesToLinkEntries.vote });

    const data = result[0];

    return {
      data: {
        id: data.id,
        vote: data.vote as Vote,
      },
    };
  }

  const result = await db
    .insert(votesToLinkEntries)
    .values({ linkEntryId, vote, userId: user.id })
    .returning({ id: votesToLinkEntries.id, vote: votesToLinkEntries.vote });

  const data = result[0];

  return {
    data: {
      id: data.id,
      vote: data.vote as Vote,
    },
  };
}
