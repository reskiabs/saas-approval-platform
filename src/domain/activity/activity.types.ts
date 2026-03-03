import { ActivityAction } from "./activity.enums";

export type ActivityId = string;
export type DocumentId = string;
export type UserId = string;

export type ActivityLog = {
  id: ActivityId;
  documentId: DocumentId;
  actorId: UserId;
  action: ActivityAction;
  createdAt: Date;
};
