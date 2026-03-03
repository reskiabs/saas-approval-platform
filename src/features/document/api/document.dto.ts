import { DocumentStatus } from "@/domain/document";

/**
 * Raw response from backend
 * (simulate real world backend contract)
 */
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

/**
 * Create payload sent to backend
 */
export type CreateDocumentRequestDto = {
  title: string;
  description?: string;
  file_url: string;
};
