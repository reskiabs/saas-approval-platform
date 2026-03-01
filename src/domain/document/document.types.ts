import { DocumentStatus } from "./document.enums";

export type DocumentId = string;
export type UserId = string;

export type Document = {
  id: DocumentId;
  title: string;
  description?: string;
  fileUrl: string;
  createdBy: UserId;
  status: DocumentStatus;
  currentStep: number;
  createdAt: Date;
  updatedAt: Date;
};
