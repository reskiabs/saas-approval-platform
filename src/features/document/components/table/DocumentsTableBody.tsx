import { Document } from "@/domain/document";
import dayjs from "dayjs";
import { DocumentsTableEmpty } from "./DocumentsTableEmpty";
import { DocumentsTableError } from "./DocumentsTableError";
import { DocumentsTableSkeleton } from "./DocumentsTableSkeleton";

type DocumentsTableBodyProps = {
  documents?: ReadonlyArray<Document>;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export function DocumentsTableBody({
  documents,
  isLoading,
  isError,
  onRetry,
}: DocumentsTableBodyProps) {
  if (isLoading) {
    return <DocumentsTableSkeleton />;
  }

  if (isError) {
    return <DocumentsTableError onRetry={onRetry} />;
  }

  if (!documents || documents.length === 0) {
    return <DocumentsTableEmpty />;
  }

  return (
    <tbody>
      {documents.map((doc) => (
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
  );
}
