import { describe, expect, it } from "vitest";
import { ActivityAction } from "./activity.enums";
import { createActivityLog } from "./activity.service";

describe("activity.service", () => {
  it("should create activity log correctly", () => {
    const activity = createActivityLog(
      "doc-1",
      "user-1",
      ActivityAction.SUBMITTED,
    );

    expect(activity.documentId).toBe("doc-1");
    expect(activity.actorId).toBe("user-1");
    expect(activity.action).toBe(ActivityAction.SUBMITTED);
    expect(activity.id).toBeDefined();
    expect(activity.createdAt).toBeInstanceOf(Date);
  });
});
