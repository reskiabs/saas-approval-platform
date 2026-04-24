import { DocumentStatus } from "@/domain/document";
import { PaginatedResponse } from "@/shared/types/pagination";

export type DocumentResponseDto = {
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

export type CreateDocumentRequestDto = {
  title: string;
  description?: string;
  file_url: string;
};

export type DocumentListResponseDto = PaginatedResponse<DocumentResponseDto>;
