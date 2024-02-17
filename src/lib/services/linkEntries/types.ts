import { Tag } from "@/lib/services/tags/types";
import { User } from "@/lib/services/users/types";

export type LinkEntry = {
  id: number;
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  user: User;
  tags: Tag[];
  score: number;
  createdAt: Date;
};
