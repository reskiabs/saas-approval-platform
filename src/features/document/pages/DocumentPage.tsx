"use client";

import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AppPagination } from "@/shared/components/Pagination";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDocuments } from "../hooks/useDocuments";

export default function DocumentsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page") ?? 1);
  const search = searchParams?.get("search") ?? undefined;

  const initialSearch = search ?? "";

  const [keyword, setKeyword] = useState(initialSearch);

  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());

    if (debouncedKeyword.trim()) {
      params.set("search", debouncedKeyword);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedKeyword]);

  const { data, isLoading, isError, refetch } = useDocuments({
    page,
    search,
  });

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams?.toString());

    params.set("page", String(nextPage));

    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return <div className="p-6">Loading documents...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 space-y-3">
        <p>Failed to load documents.</p>

        <button
          onClick={() => refetch()}
          className="rounded-md border px-3 py-2 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return <div className="p-6">No documents found.</div>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Documents</h1>

        <p className="text-sm text-muted-foreground">
          Manage and track submitted documents.
        </p>
      </header>

      <div className="flex items-center gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search documents..."
            className="pl-9"
            aria-label="Search documents"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const params = new URLSearchParams(searchParams?.toString());

            if (keyword.trim()) {
              params.set("search", keyword);
            } else {
              params.delete("search");
            }

            params.set("page", "1");

            router.replace(`${pathname}?${params.toString()}`);
          }}
        >
          Search
        </Button>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <caption className="sr-only">Documents list</caption>

          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Created By</th>
              <th className="px-4 py-3 text-left">Organization</th>
              <th className="px-4 py-3 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((doc) => (
              <tr key={doc.id} className="border-b last:border-0">
                <td className="px-4 py-3">{doc.title}</td>
                <td className="px-4 py-3">{doc.status}</td>
                <td className="px-4 py-3">{doc.creatorName}</td>
                <td className="px-4 py-3">{doc.organizationName}</td>
                <td className="px-4 py-3">
                  {dayjs(doc.createdAt).format("MMM D, YYYY h:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AppPagination
        page={page}
        totalPages={data.meta.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
