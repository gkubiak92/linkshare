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

type LinkEntryThumbnailProps = {
  imageUrl: string;
  className?: string;
};

const LinkEntryThumbnail = ({
  imageUrl,
  className,
}: LinkEntryThumbnailProps) => (
  <Image
    className={cn("rounded-2xl", className)}
    width={200}
    height={120}
    src={imageUrl}
    alt=""
  />
);

type LinkEntryProps = {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  votesCount: number;
  author: {
    imageUrl: string;
    fullName: string;
  };
  tags: string[];
};

export const LinkEntry = ({
  title,
  description,
  url,
  imageUrl,
  votesCount,
  author,
  tags,
}: LinkEntryProps) => (
  <Card className="shadow-accent">
    <CardHeader className="text-xl capitalize pb-2">{title}</CardHeader>
    <CardContent className="flex items-start gap-4">
      <div className="flex flex-col flex-1">
        <CardDescription className="h-16 max-h-16 overflow-hidden line-clamp-3">
          {description}
        </CardDescription>
        <Link href={url} className="block text-blue-600 text-xs mb-2">
          {url}
        </Link>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Chip key={index} className="block text-xs">
              {tag}
            </Chip>
          ))}
        </div>
      </div>
      <LinkEntryThumbnail imageUrl={imageUrl} className="hidden sm:block" />
    </CardContent>
  </Card>
);
