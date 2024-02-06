import { getEntries } from "@/api/entries/getEntries";
import { LinkEntry } from "@/components/linkEntry/LinkEntry";
import { Pagination } from "@/components/pagination/Pagination";

type TagsProps = {
  params: {
    tag: string;
  };
  searchParams: {
    page?: string;
    perPage?: string;
  };
};

const DEFAULT_PER_PAGE = 20;

export default async function Tags({ params, searchParams }: TagsProps) {
  const page = !!searchParams.page ? parseInt(searchParams.page) : 1;
  const perPage = !!searchParams.perPage
    ? parseInt(searchParams.perPage)
    : DEFAULT_PER_PAGE;

  const tag = decodeURIComponent(params.tag);
  const { results, count } = await getEntries({
    page,
    perPage,
    tags: tag,
  });
  const resultsWithThumbnails = results.filter(
    ({ thumbnail }) => thumbnail === null || thumbnail.endsWith(".jpg"),
  );

  const pagesCount = Math.ceil(count / perPage);

  return (
    <>
      <h2 className="text-4xl mb-8">Entries with tag: {tag}</h2>
      <div className="flex flex-col gap-4 max-w-screen-md mb-4">
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
      <Pagination currentPage={page} pagesCount={pagesCount} />
    </>
  );
}
