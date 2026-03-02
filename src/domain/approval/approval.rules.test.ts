import { describe, expect, it } from "vitest";
import { ApprovalStatus } from "./approval.enums";
import {
  getCurrentActiveStep,
  isApproved,
  isRejected,
  isWaiting,
} from "./approval.rules";
import type { ApprovalStep } from "./approval.types";

function createStep(overrides?: Partial<ApprovalStep>): ApprovalStep {
  return {
    id: "step-1",
    documentId: "doc-1",
    approverId: "user-1",
    stepOrder: 1,
    status: ApprovalStatus.WAITING,
    ...overrides,
  };
}

describe("approval.rules", () => {
  describe("basic status checks", () => {
    it("isWaiting should return true for WAITING", () => {
      const step = createStep({
        status: ApprovalStatus.WAITING,
      });

      expect(isWaiting(step)).toBe(true);
    });

    it("isApproved should return true for APPROVED", () => {
      const step = createStep({
        status: ApprovalStatus.APPROVED,
      });

      expect(isApproved(step)).toBe(true);
    });

    it("isRejected should return true for REJECTED", () => {
      const step = createStep({
        status: ApprovalStatus.REJECTED,
      });

      expect(isRejected(step)).toBe(true);
    });
  });

  describe("getCurrentActiveStep", () => {
    it("should return lowest WAITING step", () => {
      const steps: ApprovalStep[] = [
        createStep({ id: "1", stepOrder: 1, status: ApprovalStatus.APPROVED }),
        createStep({ id: "2", stepOrder: 2, status: ApprovalStatus.WAITING }),
        createStep({ id: "3", stepOrder: 3, status: ApprovalStatus.WAITING }),
      ];

      const active = getCurrentActiveStep(steps);

      expect(active?.id).toBe("2");
    });

    it("should return undefined if no waiting step", () => {
      const steps: ApprovalStep[] = [
        createStep({ status: ApprovalStatus.APPROVED }),
      ];

      const active = getCurrentActiveStep(steps);

      expect(active).toBeUndefined();
    });
  });
});
