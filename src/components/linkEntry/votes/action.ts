"use server";

import voteOnLinkEntry, {
  VoteOnLinkEntryParams,
} from "@/lib/services/linkEntries/voteOnLinkEntry";
import { getUserData } from "@/lib/services/users/getUserData";
import { redirect } from "next/navigation";
import { routes } from "@/routes";

type SaveVoteParams = VoteOnLinkEntryParams;

export async function saveVote(params: SaveVoteParams) {
  const { user } = await getUserData();

  if (!user) {
    return redirect(routes.login);
  }

  const result = await voteOnLinkEntry(params);

  return result;
}
