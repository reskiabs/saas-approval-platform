"use client";

import { DocumentsToolbar } from "@/features/document/components/DocumentsToolbar";
import { DocumentsTable } from "@/features/document/components/table/DocumentsTable";
import { useDocumentFilters } from "@/features/document/hooks/useDocumentFilters";
import { useDocuments } from "@/features/document/hooks/useDocuments";
import { AppPagination } from "@/shared/components/Pagination";

export default function DocumentsPage() {
  const { page, search, keyword, setKeyword, setPage } = useDocumentFilters();

  const { data, isLoading, isError, refetch } = useDocuments({
    page,
    search,
  });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">Document</h1>
        </div>
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
