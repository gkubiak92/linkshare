import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "@/components/link/Link";
import { Chip } from "@/components/chip/Chip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type LinkEntry as LinkEntryType } from "@/lib/services/linkEntries/types";
import { routes } from "@/routes";
import { Votes } from "@/components/linkEntry/votes/Votes";

type LinkEntryThumbnailProps = {
  imageUrl: string;
  className?: string;
};

const LinkEntryThumbnail = ({
  imageUrl,
  className,
}: LinkEntryThumbnailProps) => (
  <Image
    className={cn("rounded-xl md:rounded-2xl object-cover", className)}
    fill={true}
    src={imageUrl}
    alt=""
  />
);

export type LinkEntryProps = Omit<LinkEntryType, "tags"> & {
  tags: string[];
} & { canVote?: boolean };

export const LinkEntry = ({
  id,
  title,
  description,
  url,
  thumbnailUrl,
  user,
  tags,
  canVote,
  userVote,
  likes,
  dislikes,
}: LinkEntryProps) => (
  <Card className="shadow-accent">
    <CardHeader className="pb-0 md:pb-2">
      {thumbnailUrl && (
        <div className="block md:hidden relative w-full h-28">
          <LinkEntryThumbnail imageUrl={thumbnailUrl} />
        </div>
      )}
      <span className="text-md md:text-xl capitalize">{title}</span>
    </CardHeader>
    <CardContent className="flex flex-col">
      <div className="flex items-start gap-4">
        <div className="flex flex-col flex-1 max-w-full">
          <CardDescription className="h-16 max-h-16 overflow-hidden line-clamp-3">
            {description}
          </CardDescription>
          <Link
            href={url}
            className="block text-blue-600 text-xs mb-2 break-words"
          >
            {url}
          </Link>
          <div className="flex gap-2 flex-wrap mb-2">
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`${routes.links.tags}/${encodeURIComponent(tag)}`}
              >
                <Chip className="block text-xs">#{tag}</Chip>
              </Link>
            ))}
          </div>
        </div>
        {thumbnailUrl && (
          <div className="hidden md:block relative w-44 h-28">
            <LinkEntryThumbnail imageUrl={thumbnailUrl} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl text-muted-foreground">
          <Votes
            canVote={!!canVote}
            linkEntryId={id}
            vote={userVote ?? 0}
            likes={likes}
            dislikes={dislikes}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="block text-zinc-500 text-sm">{user.name}</span>
          <Image
            className="rounded-full"
            src={user.image || "/assets/avatar.png"}
            width={24}
            height={24}
            alt={`${user.name} avatar image`}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);
