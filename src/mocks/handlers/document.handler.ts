import { DocumentStatus } from "@/domain/document";
import { CreateDocumentRequestDto } from "@/features/document/api/document.dto";
import { http, HttpResponse } from "msw";

type DocumentEntity = {
  id: string;
  title: string;
  description?: string | null;
  file_url: string;
  created_by: string;
  status: DocumentStatus;
  current_step: number;
  created_at: string;
  updated_at: string;
};

let documents: DocumentEntity[] = [];

export const documentHandlers = [
  // GET ALL
  http.get("/api/documents", () => {
    return HttpResponse.json(documents);
  }),

  // GET BY ID
  http.get("/api/documents/:id", ({ params }) => {
    const doc = documents.find((d) => d.id === params.id);

    if (!doc) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json(doc);
  }),

  // CREATE
  http.post("/api/documents", async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      description?: string;
      file_url: string;
    } | null;

    if (!body) {
      return HttpResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    if (!body.title || !body.file_url) {
      return HttpResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();

    const newDoc: DocumentEntity = {
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description ?? null,
      file_url: body.file_url,
      created_by: "user-1",
      status: DocumentStatus.DRAFT,
      current_step: 0,
      created_at: now,
      updated_at: now,
    };

    documents.push(newDoc);

    return HttpResponse.json(newDoc, { status: 201 });
  }),
  // UPDATE
  http.put("/api/documents/:id", async ({ params, request }) => {
    const body = (await request.json()) as Partial<CreateDocumentRequestDto>;

    const index = documents.findIndex((d) => d.id === params.id);

    if (index === -1) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    documents[index] = {
      ...documents[index],
      ...body,
      updated_at: new Date().toISOString(),
    };

    return HttpResponse.json(documents[index]);
  }),

  // DELETE
  http.delete("/api/documents/:id", ({ params }) => {
    documents = documents.filter((d) => d.id !== params.id);

    return HttpResponse.json({ id: params.id });
  }),
];
