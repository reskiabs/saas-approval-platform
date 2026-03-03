import { Document } from "@/domain/document";
import { DocumentResponseDto } from "./document.dto";

export const documentMapper = {
  toDomain(dto: DocumentResponseDto): Document {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description ?? undefined,
      fileUrl: dto.file_url,
      createdBy: dto.created_by,
      status: dto.status,
      currentStep: dto.current_step,
      createdAt: new Date(dto.created_at),
      updatedAt: new Date(dto.updated_at),
    };
  },
};
