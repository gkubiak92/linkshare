import { getTags } from "@/api/tags/getTags";
import { Chip } from "@/components/chip/Chip";
import Link from "next/link";
import { routes } from "@/routes";
import { cn } from "@/lib/utils";

const PER_PAGE = 50;

type TrendingTagsProps = {
  className?: string;
};

export default async function TrendingTags({ className }: TrendingTagsProps) {
  const { results } = await getTags({
    page: 1,
    perPage: PER_PAGE,
    assigned: "true",
    ordering: "-num_res",
  });

  return (
    <aside className={cn("max-w-full", className)}>
      <h2 className="text-xl md:text-2xl mb-2 lg:mb-8">Trending Tags</h2>
      <div className="lg:bg-gray-50 rounded-2xl py-4 lg:p-4 flex lg:flex-wrap gap-2 max-w-full overflow-auto">
        {results.map(({ tag }, index) => (
          <Link key={`${tag}-index`} href={`${routes.tags}/${tag}`}>
            <Chip className="text-xs">{tag}</Chip>
          </Link>
        ))}
      </div>
    </aside>
  );
}
