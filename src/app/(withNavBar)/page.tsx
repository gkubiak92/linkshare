import { getEntries } from "@/api/entries/getEntries";
import { LinkEntry } from "@/components/linkEntry/LinkEntry";
import { Pagination } from "@/components/pagination/Pagination";
import TrendingTags from "@/components/trendingTags/TrendingTags";

type HomeProps = {
  params: Record<string, unknown>;
  searchParams: {
    page?: string;
    perPage?: string;
  };
};

const DEFAULT_PER_PAGE = 20;

export default async function Home({ searchParams }: HomeProps) {
  const page = !!searchParams.page ? parseInt(searchParams.page) : 1;
  const perPage = !!searchParams.perPage
    ? parseInt(searchParams.perPage)
    : DEFAULT_PER_PAGE;

  const { results, count } = await getEntries({ page, perPage });
  const resultsWithThumbnails = results.filter(
    ({ thumbnail }) => thumbnail === null || thumbnail.endsWith(".jpg"),
  );

  const pagesCount = Math.ceil(count / perPage);

  return (
    <>
      <section className="flex items-start flex-col lg:flex-row gap-4">
        <TrendingTags className="order-1 lg:order-2" />
        <div className="flex flex-col gap-4 max-w-full mb-4 order-2 lg:order-1">
          <h2 className="text-4xl mb-2">All entries</h2>
          {resultsWithThumbnails.map(
            ({
              id,
              title,
              description,
              resource_url,
              thumbnail,
              score,
              user,
              tags,
            }) => (
              <LinkEntry
                key={id}
                title={title}
                description={description}
                url={resource_url}
                thumbnailUrl={thumbnail}
                score={score}
                author={user}
                tags={tags}
              />
            ),
          )}
        </div>
      </section>
      <Pagination currentPage={page} pagesCount={pagesCount} />
    </>
  );
}
