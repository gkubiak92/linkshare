import { LinkEntry } from "@/components/linkEntry/LinkEntry";
import { Pagination } from "@/components/pagination/Pagination";
import { getLinkEntries } from "@/lib/services/linkEntries/getLinkEntries";
import { getTranslations } from "next-intl/server";

type TagsProps = {
  params: {
    tag: string;
  };
  searchParams: {
    search?: string;
    page?: string;
    perPage?: string;
  };
};

const DEFAULT_PER_PAGE = 20;

export default async function Tags({ params, searchParams }: TagsProps) {
  const t = await getTranslations("tags");

  const search = searchParams.search;
  const page = !!searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = !!searchParams.perPage
    ? parseInt(searchParams.perPage)
    : DEFAULT_PER_PAGE;
  const tag = decodeURIComponent(params.tag);

  const { data, pagination } = await getLinkEntries({
    search,
    tag,
    page,
    pageSize,
  });

  const pagesCount = Math.ceil(pagination.total / pageSize);

  return (
    <>
      <h2 className="text-4xl mb-8">{t("title", { tag })}</h2>
      <div className="flex flex-col gap-4 max-w-screen-lg mb-4">
        {data.map(({ id, ...props }) => (
          <LinkEntry key={id} {...props} />
        ))}
      </div>
      <Pagination currentPage={page} pagesCount={pagesCount} />
    </>
  );
}
