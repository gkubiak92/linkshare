"use client";
import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

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

export const Pagination = async ({
  currentPage,
  pagesCount,
}: PaginationProps) => {
  const t = useTranslations("pagination");

  const path = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.delete("page");

  const paginationItems: ReactNode[] = [];

  let startPage = Math.max(1, currentPage - Math.floor(PAGES_TO_SHOW / 2));
  let endPage = Math.min(pagesCount, startPage + PAGES_TO_SHOW - 1);

  if (endPage - startPage < PAGES_TO_SHOW - 1) {
    startPage = Math.max(1, endPage - PAGES_TO_SHOW + 1);
  }

  if (currentPage > 1) {
    paginationItems.push(
      <PaginationItem key="pagination-previous">
        <PaginationPrevious
          href={getPageUrl(currentPage - 1, path, params)}
          label={t("previous")}
        />
      </PaginationItem>,
    );
  }

  if (currentPage > Math.floor(PAGES_TO_SHOW / 2) + 1) {
    paginationItems.push(
      <PaginationItem key="pagination-first-page">
        <PaginationLink href={getPageUrl(1, path, params)}>{1}</PaginationLink>
      </PaginationItem>,
    );
  }

  if (startPage > 1 + Math.floor(PAGES_TO_SHOW / 2)) {
    const leftEllipsisReplacement = 2;
    if (startPage - 1 === leftEllipsisReplacement) {
      paginationItems.push(
        <PaginationItem key="pagination-left-ellipsis">
          <PaginationLink
            href={getPageUrl(leftEllipsisReplacement, path, params)}
          >
            {leftEllipsisReplacement}
          </PaginationLink>
        </PaginationItem>,
      );
    } else {
      paginationItems.push(
        <PaginationItem key="pagination-left-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <PaginationItem key={`pagination-page-${i}`}>
        <PaginationLink
          href={getPageUrl(i, path, params)}
          isActive={currentPage === i}
        >
          {i}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  if (endPage < pagesCount - Math.floor(PAGES_TO_SHOW / 2)) {
    const rightEllipsisReplacement = pagesCount - 1;
    if (endPage === rightEllipsisReplacement - 1) {
      paginationItems.push(
        <PaginationItem key="pagination-right-ellipsis">
          <PaginationLink
            href={getPageUrl(rightEllipsisReplacement, path, params)}
          >
            {rightEllipsisReplacement}
          </PaginationLink>
        </PaginationItem>,
      );
    } else {
      paginationItems.push(
        <PaginationItem key="pagination-right-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }
  }

  if (endPage < pagesCount - Math.floor(PAGES_TO_SHOW / 2) + 1) {
    paginationItems.push(
      <PaginationItem key="pagination-last-page">
        <PaginationLink href={getPageUrl(pagesCount, path, params)}>
          {pagesCount}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  if (currentPage < pagesCount) {
    paginationItems.push(
      <PaginationItem key="pagination-next">
        <PaginationNext
          href={getPageUrl(currentPage + 1, path, params)}
          label={t("next")}
        />
      </PaginationItem>,
    );
  }

  return (
    <PaginationBase>
      <PaginationContent>{paginationItems}</PaginationContent>
    </PaginationBase>
  );
};
