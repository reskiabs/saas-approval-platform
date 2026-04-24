"use client";

import { useDocuments } from "../hooks/useDocuments";

export default function DocumentsPage() {
  const { data, isLoading, isError, refetch } = useDocuments();

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

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <caption className="sr-only">Documents list</caption>

          <thead className="border-b bg-muted/40">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                Title
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Created By
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Created At
              </th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((doc) => (
              <tr key={doc.id} className="border-b last:border-0">
                <td className="px-4 py-3">{doc.title}</td>
                <td className="px-4 py-3">{doc.status}</td>
                <td className="px-4 py-3">{doc.createdBy}</td>
                <td className="px-4 py-3">
                  {doc.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted-foreground">
        Total {data.meta.total} documents
      </p>
    </div>
  );
}
