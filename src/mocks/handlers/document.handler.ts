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

const statuses = Object.values(DocumentStatus);

function randomStatus() {
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function seedDocuments(count = 120): DocumentEntity[] {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);

    return {
      id: crypto.randomUUID(),
      title: `Document Request ${i + 1}`,
      description: `Description for document ${i + 1}`,
      file_url: `/files/document-${i + 1}.pdf`,
      created_by: `user-${(i % 5) + 1}`,
      status: randomStatus(),
      current_step: Math.floor(Math.random() * 4),
      created_at: date.toISOString(),
      updated_at: date.toISOString(),
    };
  });
}

let documents: DocumentEntity[] = seedDocuments();

export const documentHandlers = [
  /**
   * GET LIST
   * ?search=
   * ?status=
   * ?page=1
   * ?limit=10
   */
  http.get("/api/documents", ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search")?.toLowerCase() ?? "";
    const status = url.searchParams.get("status");
    const page = Number(url.searchParams.get("page") ?? 1);
    const limit = Number(url.searchParams.get("limit") ?? 10);

    let result = [...documents];

    // search
    if (search) {
      result = result.filter(
        (doc) =>
          doc.title.toLowerCase().includes(search) ||
          doc.description?.toLowerCase().includes(search),
      );
    }

    // filter status
    if (status) {
      result = result.filter((doc) => doc.status === status);
    }

    // sort latest
    result.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    const total = result.length;
    const totalPages = Math.ceil(total / limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = result.slice(start, end);

    return HttpResponse.json({
      data: paginated,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  }),

  http.get("/api/documents/:id", ({ params }) => {
    const doc = documents.find((d) => d.id === params.id);

    if (!doc) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json(doc);
  }),

  http.post("/api/documents", async ({ request }) => {
    const body = (await request.json()) as CreateDocumentRequestDto;

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

    documents.unshift(newDoc);

    return HttpResponse.json(newDoc, { status: 201 });
  }),

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

  http.delete("/api/documents/:id", ({ params }) => {
    documents = documents.filter((d) => d.id !== params.id);

    return HttpResponse.json({ id: params.id });
  }),
];
