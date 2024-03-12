"use client";

import { Vote } from "@/lib/services/linkEntries/voteOnLinkEntry";
import { Button, ButtonProps } from "@/components/ui/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { saveVote } from "./action";

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

  const commonButtonProps: Partial<ButtonProps> = {
    variant: "ghost",
    disabled: !canVote || isPending,
    className: "flex gap-2 items-center",
  };

  return (
    <>
      <Button
        {...commonButtonProps}
        onClick={() => voteAction("like", isLiked ? 0 : 1)}
      >
        <ThumbsUpIcon size={16} className={cn({ "fill-primary": isLiked })} />
        <span>{likes}</span>
      </Button>
      <Button
        {...commonButtonProps}
        onClick={() => voteAction("dislike", isDisliked ? 0 : -1)}
      >
        <ThumbsDownIcon
          size={16}
          className={cn({ "fill-primary": isDisliked })}
        />
        <span>{dislikes}</span>
      </Button>
    </>
  );
};
