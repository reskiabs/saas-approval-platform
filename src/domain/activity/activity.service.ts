import { ActivityAction } from "./activity.enums";
import { ActivityLog } from "./activity.types";

export function createActivityLog(
  documentId: string,
  actorId: string,
  action: ActivityAction,
): ActivityLog {
  return {
    id: crypto.randomUUID(),
    documentId,
    actorId,
    action,
    createdAt: new Date(),
  };
}
