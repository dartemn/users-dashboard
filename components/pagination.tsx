"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  skip: number;
  limit: number;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  skip,
  limit,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-0">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Показано от <span className="font-medium">{skip + 1}</span> до{" "}
          <span className="font-medium">
            {Math.min(skip + limit, totalItems)}
          </span>{" "}
          из <span className="font-medium">{totalItems}</span> результатов
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end gap-2">
        {currentPage <= 1 ? (
          <span
            aria-disabled="true"
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-200"
          >
            Назад
          </span>
        ) : (
          <Link
            href={createPageURL(currentPage - 1)}
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Назад
          </Link>
        )}
        {currentPage >= totalPages ? (
          <span
            aria-disabled="true"
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-200"
          >
            Вперед
          </span>
        ) : (
          <Link
            href={createPageURL(currentPage + 1)}
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Вперед
          </Link>
        )}
      </div>
    </div>
  );
}
