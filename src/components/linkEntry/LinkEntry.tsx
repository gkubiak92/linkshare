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
import { Button } from "@/components/ui/button";

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

export type LinkEntryProps = Omit<LinkEntryType, "id"> & { canVote?: boolean };

export const LinkEntry = ({
  title,
  description,
  url,
  thumbnailUrl,
  user,
  tags,
  score,
  canVote,
  createdAt,
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
    <CardContent className="flex items-start gap-4">
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
          {tags.map(({ name }, index) => (
            <Link
              key={index}
              href={`${routes.links.tags}/${encodeURIComponent(name)}`}
            >
              <Chip className="block text-xs">#{name}</Chip>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 text-2xl text-muted-foreground">
          <span className="block">🎯</span>
          <span className="block text-lg text-zinc-500">{score}</span>
          {canVote && (
            <>
              <Button variant="ghost">👍</Button>
              <Button variant="ghost">👎</Button>
            </>
          )}
        </div>
      </div>
      {thumbnailUrl && (
        <div className="hidden md:block relative w-44 h-28">
          <LinkEntryThumbnail imageUrl={thumbnailUrl} />
        </div>
      )}
    </CardContent>
  </Card>
);
