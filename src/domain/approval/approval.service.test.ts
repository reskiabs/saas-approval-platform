import { describe, expect, it } from "vitest";
import { ApprovalStatus } from "./approval.enums";
import { approveStep, rejectStep } from "./approval.service";
import type { ApprovalStep } from "./approval.types";

function createSteps(): ApprovalStep[] {
  return [
    {
      id: "1",
      documentId: "doc-1",
      approverId: "user-1",
      stepOrder: 1,
      status: ApprovalStatus.WAITING,
    },
    {
      id: "2",
      documentId: "doc-1",
      approverId: "user-2",
      stepOrder: 2,
      status: ApprovalStatus.WAITING,
    },
  ];
}

describe("approval.service", () => {
  describe("approveStep", () => {
    it("should approve current active step", () => {
      const steps = createSteps();

      const result = approveStep(steps, "user-1");

      expect(result[0].status).toBe(ApprovalStatus.APPROVED);
    });

    it("should throw if wrong approver", () => {
      const steps = createSteps();

      expect(() => approveStep(steps, "user-999")).toThrowError(
        "You are not allowed to approve this step",
      );
    });

    it("should not mutate original array", () => {
      const steps = createSteps();

      const result = approveStep(steps, "user-1");

      expect(result).not.toBe(steps);
      expect(steps[0].status).toBe(ApprovalStatus.WAITING);
    });
  });

  describe("rejectStep", () => {
    it("should reject current active step", () => {
      const steps = createSteps();

      const result = rejectStep(steps, "user-1");

      expect(result[0].status).toBe(ApprovalStatus.REJECTED);
    });

    it("should throw if no active step", () => {
      const steps: ApprovalStep[] = [
        {
          id: "1",
          documentId: "doc-1",
          approverId: "user-1",
          stepOrder: 1,
          status: ApprovalStatus.APPROVED,
        },
      ];

      expect(() => rejectStep(steps, "user-1")).toThrowError(
        "No active approval step",
      );
    });
  });
});
