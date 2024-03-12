import { Tag } from "@/lib/services/tags/types";
import { User } from "@/lib/services/users/types";
import { Vote } from "@/lib/services/linkEntries/voteOnLinkEntry";

export type LinkEntry = {
  id: number;
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  user: User;
  tags: Tag[];
  likes: number;
  dislikes: number;
  userVote: Vote | null;
  createdAt: Date;
};
