import { Document } from "@/domain/document";
import { http } from "@/shared/api/http";
import {
  CreateDocumentRequestDto,
  DocumentListResponseDto,
  DocumentResponseDto,
} from "./document.dto";
import { documentMapper } from "./document.mapper";

type GetDocumentsParams = {
  page?: number;
  search?: string;
  status?: string;
};

export const documentApi = {
  async getAll(params?: GetDocumentsParams) {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.search) searchParams.set("search", params.search);
    if (params?.status) searchParams.set("status", params.status);

    const query = searchParams.toString();

    const url = query ? `/api/documents?${query}` : "/api/documents";

    const res = await http.get<DocumentListResponseDto>(url);

    return {
      data: res.data.map(documentMapper.toDomain),
      meta: res.meta,
    };
  },

  async getById(id: string): Promise<Document> {
    const res = await http.get<DocumentResponseDto>(`/api/documents/${id}`);
    return documentMapper.toDomain(res);
  },

  async create(payload: CreateDocumentRequestDto): Promise<Document> {
    const res = await http.post<DocumentResponseDto, CreateDocumentRequestDto>(
      "/api/documents",
      payload,
    );

    return documentMapper.toDomain(res);
  },

  async update(
    id: string,
    payload: Partial<CreateDocumentRequestDto>,
  ): Promise<Document> {
    const res = await http.put<
      DocumentResponseDto,
      Partial<CreateDocumentRequestDto>
    >(`/api/documents/${id}`, payload);

    return documentMapper.toDomain(res);
  },

  async remove(id: string): Promise<{ id: string }> {
    return http.delete(`/api/documents/${id}`);
  },
};
