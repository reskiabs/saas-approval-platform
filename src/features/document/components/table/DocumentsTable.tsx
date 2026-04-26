import { Document } from "@/domain/document";
import { DocumentsTableBody } from "./DocumentsTableBody";

type DocumentsTableProps = {
  documents?: ReadonlyArray<Document>;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export function DocumentsTable({
  documents,
  isLoading,
  isError,
  onRetry,
}: DocumentsTableProps) {
  return (
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

        <DocumentsTableBody
          documents={documents}
          isLoading={isLoading}
          isError={isError}
          onRetry={onRetry}
        />
      </table>
    </div>
  );
}
