import { LinkEntry } from "@/components/linkEntry/LinkEntry";
import { Pagination } from "@/components/pagination/Pagination";
import TrendingTags from "@/components/trendingTags/TrendingTags";
import { Suspense } from "react";
import Loading from "../loading";
import { getTranslations } from "next-intl/server";
import { getLinkEntries } from "@/lib/services/linkEntries/getLinkEntries";

type HomeProps = {
  params: Record<string, unknown>;
  searchParams: {
    search?: string;
    page?: string;
    perPage?: string;
  };
};

const DEFAULT_PER_PAGE = 20;

export default async function Home({ searchParams }: HomeProps) {
  const t = await getTranslations("index");

  const search = searchParams.search;
  const page = !!searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = !!searchParams.perPage
    ? parseInt(searchParams.perPage)
    : DEFAULT_PER_PAGE;

  const { data, pagination } = await getLinkEntries({
    search,
    limit,
    offset: (page - 1) * limit,
  });

  const pagesCount = Math.ceil(pagination.total / limit);

  return (
    <Suspense fallback={<Loading />}>
      <section className="flex items-start flex-col lg:flex-row gap-4">
        <TrendingTags className="flex-1 order-1 lg:order-2" />
        <div className="flex flex-col gap-4 flex-[2] max-w-full mb-4 order-2 lg:order-1">
          <h2 className="text-4xl mb-2">{t("allEntries")}</h2>
          {data.map(({ id, ...props }) => (
            <LinkEntry key={id} {...props} />
          ))}
        </div>
      </section>
      <Pagination currentPage={page} pagesCount={pagesCount} />
    </Suspense>
  );
}
