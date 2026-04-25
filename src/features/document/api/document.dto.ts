import { DocumentStatus } from "@/domain/document";
import { PaginatedResponse } from "@/shared/types/pagination";

export type DocumentResponseDto = {
  id: string;
  organization_id: string;
  reference_number: string;

  title: string;
  description?: string | null;

  file_url: string;
  file_name?: string | null;
  file_size?: number | null;
  mime_type?: string | null;

  created_by: string;
  assigned_to?: string | null;

  status: DocumentStatus;
  current_step: number;
  total_steps: number;

  created_at: string;
  updated_at: string;

  creator?: {
    id: string;
    full_name: string;
    role: string;
  } | null;

  assignee?: {
    id: string;
    full_name: string;
  } | null;

  organization?: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type CreateDocumentRequestDto = {
  title: string;
  description?: string;
  file_url: string;
};

export type DocumentListResponseDto = PaginatedResponse<DocumentResponseDto>;
