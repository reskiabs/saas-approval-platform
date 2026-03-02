import { ApprovalStatus } from "./approval.enums";

export type ApprovalStepId = string;
export type DocumentId = string;
export type UserId = string;

export type ApprovalStep = {
  id: ApprovalStepId;
  documentId: DocumentId;
  approverId: UserId;
  stepOrder: number;
  status: ApprovalStatus;
  note?: string;
  actedAt?: Date;
};
