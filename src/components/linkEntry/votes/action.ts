"use server";

import voteOnLinkEntry, {
  VoteOnLinkEntryParams,
} from "@/lib/services/linkEntries/voteOnLinkEntry";

type SaveVoteParams = VoteOnLinkEntryParams;

export async function saveVote(params: SaveVoteParams) {
  const result = await voteOnLinkEntry(params);

  return result;
}
