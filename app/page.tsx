import { getUsers } from "@/lib/api";
import { SearchBar } from "@/components/search-bar";
import { UsersTable } from "@/components/users-table";
import { Pagination } from "@/components/pagination";
import { Suspense } from "react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  const queryParam = params.q;
  const query = Array.isArray(queryParam)
    ? (queryParam[0] ?? "")
    : (queryParam ?? "");
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number(pageParam);
  const currentPage =
    Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <main className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Пользователи
          </h1>
          <Suspense
            fallback={
              <div className="h-10 w-full max-w-sm animate-pulse rounded-lg bg-gray-200" />
            }
          >
            <SearchBar defaultValue={query} />
          </Suspense>
        </div>

        <Suspense
          fallback={
            <div className="h-96 w-full animate-pulse rounded-xl bg-gray-200" />
          }
        >
          <UsersContent query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}

async function UsersContent({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const limit = 10;
  const data = await getUsers(query, currentPage, limit);
  const totalPages = Math.ceil(data.total / limit);

  return (
    <>
      <UsersTable users={data.users} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={data.total}
          skip={(currentPage - 1) * limit}
          limit={limit}
        />
      )}
    </>
  );
}
