"use client";

import { Vote } from "@/lib/services/linkEntries/voteOnLinkEntry";
import { Button, ButtonProps } from "@/components/ui/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { saveVote } from "./action";

type VotesProps = {
  linkEntryId: number;
  vote?: Vote;
};

export const Votes = ({ linkEntryId, vote: defaultVote = 0 }: VotesProps) => {
  const [vote, setVote] = useState<Vote>(defaultVote);
  const [isPending, setIsPending] = useState(false);

  const voteAction = async (vote: Vote) => {
    setIsPending(true);
    setVote(vote);
    await saveVote({ linkEntryId, vote });
    setIsPending(false);
  };

  const isLiked = vote === 1;
  const isDisliked = vote === -1;

  const commonButtonProps: Partial<ButtonProps> = {
    variant: "ghost",
    disabled: isPending,
  };

  return (
    <>
      <Button
        {...commonButtonProps}
        onClick={() => voteAction(isLiked ? 0 : 1)}
      >
        <ThumbsUpIcon size={16} className={cn({ "fill-primary": isLiked })} />
      </Button>
      <Button
        {...commonButtonProps}
        onClick={() => voteAction(isDisliked ? 0 : -1)}
      >
        <ThumbsDownIcon
          size={16}
          className={cn({ "fill-primary": isDisliked })}
        />
      </Button>
    </>
  );
};
