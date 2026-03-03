import { Document } from "@/domain/document";
import { http } from "@/shared/api/http";
import { CreateDocumentRequestDto, DocumentResponseDto } from "./document.dto";
import { documentMapper } from "./document.mapper";

export const documentApi = {
  async getAll(): Promise<ReadonlyArray<Document>> {
    const res = await http.get<DocumentResponseDto[]>("/api/documents");

    return res.map(documentMapper.toDomain);
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
