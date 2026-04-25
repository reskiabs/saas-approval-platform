import { DocumentStatus } from "./document.enums";

export type DocumentId = string;
export type UserId = string;
export type OrganizationId = string;

export type Document = {
  id: DocumentId;
  organizationId: OrganizationId;

  referenceNumber: string;

  title: string;
  description?: string;

  fileUrl: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;

  createdBy: UserId;
  assignedTo?: UserId;

  status: DocumentStatus;

  currentStep: number;
  totalSteps: number;

  createdAt: Date;
  updatedAt: Date;

  // denormalized relational display fields
  creatorName?: string;
  creatorRole?: string;

  assigneeName?: string;

  organizationName?: string;
  organizationSlug?: string;
};
