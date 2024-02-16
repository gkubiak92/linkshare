import { Chip } from "@/components/chip/Chip";
import { Link } from "@/components/link/Link";
import { routes } from "@/routes";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { getTrendingTags } from "@/lib/services/tags/getTrendingTags";

type TrendingTagsProps = {
  className?: string;
};

export default async function TrendingTags({ className }: TrendingTagsProps) {
  const t = await getTranslations("trendingTags");

  const { data } = await getTrendingTags();

  return (
    <aside className={cn("max-w-full", className)}>
      <h2 className="text-xl md:text-2xl mb-2 lg:mb-8">{t("title")}</h2>
      <div className="lg:bg-gray-50 rounded-2xl py-4 lg:p-4 flex lg:flex-wrap gap-2 max-w-full overflow-auto">
        {data.map(({ id, name }) => (
          <Link key={id} href={`${routes.links.tags}/${name}`}>
            <Chip className="text-xs">{name}</Chip>
          </Link>
        ))}
      </div>
    </aside>
  );
}
