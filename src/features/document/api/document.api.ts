import { Document } from "@/domain/document";
import { http } from "@/shared/api/http";
import { createClient } from "@/shared/lib/supabase/client";
import { CreateDocumentRequestDto, DocumentResponseDto } from "./document.dto";
import { documentMapper } from "./document.mapper";

type GetDocumentsParams = {
  page?: number;
  search?: string;
  status?: string;
};

const PAGE_SIZE = 10;

export const documentApi = {
  async getAll(params?: GetDocumentsParams) {
    const supabase = createClient();

    const page = params?.page ?? 1;
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("documents")
      .select(
        `
    *,
    creator:profiles!documents_created_by_fkey (
      id,
      full_name,
      role
    ),
    assignee:profiles!documents_assigned_to_fkey (
      id,
      full_name
    ),
    organization:organizations!documents_organization_id_fkey (
      id,
      name,
      slug
    )
  `,
        { count: "exact" },
      )
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (params?.search) {
      query = query.ilike("title", `%${params.search}%`);
    }

    if (params?.status) {
      query = query.eq("status", params.status);
    }

    const { data, count, error } = await query;

    if (error) throw error;

    return {
      data: (data ?? []).map((item) =>
        documentMapper.toDomain(item as DocumentResponseDto),
      ),
      meta: {
        page,
        limit: PAGE_SIZE,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
      },
    };
  },

  async getById(id: string): Promise<Document> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return documentMapper.toDomain(data as DocumentResponseDto);
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
