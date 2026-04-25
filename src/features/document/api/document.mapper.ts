import { Document } from "@/domain/document";
import { DocumentResponseDto } from "./document.dto";

export const documentMapper = {
  toDomain(dto: DocumentResponseDto): Document {
    return {
      id: dto.id,
      organizationId: dto.organization_id,
      referenceNumber: dto.reference_number,

      title: dto.title,
      description: dto.description ?? undefined,

      fileUrl: dto.file_url,
      fileName: dto.file_name ?? undefined,
      fileSize: dto.file_size ?? undefined,
      mimeType: dto.mime_type ?? undefined,

      createdBy: dto.created_by,
      assignedTo: dto.assigned_to ?? undefined,

      status: dto.status,
      currentStep: dto.current_step,
      totalSteps: dto.total_steps,

      createdAt: new Date(dto.created_at),
      updatedAt: new Date(dto.updated_at),

      creatorName: dto.creator?.full_name,
      creatorRole: dto.creator?.role,

      assigneeName: dto.assignee?.full_name,

      organizationName: dto.organization?.name,
      organizationSlug: dto.organization?.slug,
    };
  },
};
