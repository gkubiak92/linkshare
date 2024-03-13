"use client";

import { Vote } from "@/lib/services/linkEntries/voteOnLinkEntry";
import { useState } from "react";
import { saveVote } from "./action";
import { VoteButton } from "./button/VoteButton";

type VotesProps = {
  canVote: boolean;
  linkEntryId: number;
  likes: number;
  dislikes: number;
  vote?: Vote;
};

export const Votes = ({
  canVote,
  linkEntryId,
  likes: defaultLikes,
  dislikes: defaultDislikes,
  vote: defaultVote = 0,
}: VotesProps) => {
  const [vote, setVote] = useState<Vote>(defaultVote);
  const [likes, setLikes] = useState(defaultLikes);
  const [dislikes, setDislikes] = useState(defaultDislikes);
  const [isPending, setIsPending] = useState(false);

  const voteAction = async (action: "like" | "dislike", v: Vote) => {
    setIsPending(true);
    const previousVote = vote;
    setVote(v);
    switch (action) {
      case "like":
        if (v === 1) {
          setLikes((prev) => prev + 1);
          if (previousVote === -1) {
            setDislikes((prev) => prev - 1);
          }
        }
        if (v === 0) {
          setLikes((prev) => prev - 1);
        }
        break;
      case "dislike":
        if (v === -1) {
          setDislikes((prev) => prev + 1);
          if (previousVote === 1) {
            setLikes((prev) => prev - 1);
          }
        }
        if (v === 0) {
          setDislikes((prev) => prev - 1);
        }
        break;
    }
    await saveVote({ linkEntryId, vote: v });
    setIsPending(false);
  };

  const isLiked = vote === 1;
  const isDisliked = vote === -1;
  const disabled = !canVote || isPending;

  return (
    <>
      <VoteButton
        icon="thumbUp"
        onClick={() => voteAction("like", isLiked ? 0 : 1)}
        count={likes}
        isActive={isLiked}
        disabled={disabled}
      />
      <VoteButton
        icon="thumbDown"
        onClick={() => voteAction("dislike", isDisliked ? 0 : -1)}
        count={dislikes}
        isActive={isDisliked}
        disabled={disabled}
      />
    </>
  );
};
