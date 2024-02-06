import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Chip } from "@/components/chip/Chip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type LinkEntry as LinkEntryType } from "@/api/entries/getEntries";
import { routes } from "@/routes";

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

export type LinkEntryProps = {
  title: LinkEntryType["title"];
  description: LinkEntryType["description"];
  url: LinkEntryType["resource_url"];
  thumbnailUrl: LinkEntryType["thumbnail"];
  score: LinkEntryType["score"];
  author: LinkEntryType["user"];
  tags: LinkEntryType["tags"];
};

export const LinkEntry = ({
  title,
  description,
  url,
  thumbnailUrl,
  score,
  author,
  tags,
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
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Link key={index} href={`${routes.tags}/${tag}`}>
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
    </CardContent>
  </Card>
);
