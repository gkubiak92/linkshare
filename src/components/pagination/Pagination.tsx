"use client";
import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  pagesCount: number;
};

const PAGES_TO_SHOW = 3;

const getPageUrl = (
  page: number,
  path: string,
  searchParams: URLSearchParams,
) => {
  searchParams.set("page", page.toString());

  return `${path}?${searchParams}`;
};

export const Pagination = ({ currentPage, pagesCount }: PaginationProps) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.delete("page");

  const pagesToShow = Array.from({ length: PAGES_TO_SHOW }, (_, index) => {
    if (currentPage + PAGES_TO_SHOW > pagesCount) {
      return pagesCount - PAGES_TO_SHOW + index + 1;
    }

    return currentPage + index;
  });

  return (
    <PaginationBase>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={getPageUrl(currentPage - 1, path, params)}
            />
          </PaginationItem>
        )}
        {pagesToShow.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={getPageUrl(page, path, params)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < pagesCount && (
          <PaginationItem>
            <PaginationNext href={getPageUrl(currentPage + 1, path, params)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationBase>
  );
};
