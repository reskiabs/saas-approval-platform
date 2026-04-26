"use client";

import { AppPagination } from "@/shared/components/Pagination";
import { DocumentsToolbar } from "../components/DocumentsToolbar";
import { DocumentsTable } from "../components/table/DocumentsTable";
import { useDocumentFilters } from "../hooks/useDocumentFilters";
import { useDocuments } from "../hooks/useDocuments";

export default function DocumentsPage() {
  const { page, search, keyword, setKeyword, setPage } = useDocumentFilters();

  const { data, isLoading, isError, refetch } = useDocuments({
    page,
    search,
  });

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track submitted documents.
        </p>
      </header>

      <DocumentsToolbar keyword={keyword} onKeywordChange={setKeyword} />

      <DocumentsTable
        documents={data?.data}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
      />

      {data && data.meta.totalPages > 1 && (
        <AppPagination
          page={page}
          totalPages={data.meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
