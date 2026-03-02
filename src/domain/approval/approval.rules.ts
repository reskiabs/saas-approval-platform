import { ApprovalStatus } from "./approval.enums";
import { ApprovalStep } from "./approval.types";

export function isWaiting(step: ApprovalStep) {
  return step.status === ApprovalStatus.WAITING;
}

export function isApproved(step: ApprovalStep) {
  return step.status === ApprovalStatus.APPROVED;
}

export function isRejected(step: ApprovalStep) {
  return step.status === ApprovalStatus.REJECTED;
}

/**
 * Only step with lowest WAITING order is active
 */
export function getCurrentActiveStep(
  steps: ApprovalStep[],
): ApprovalStep | undefined {
  return steps
    .filter((s) => s.status === ApprovalStatus.WAITING)
    .sort((a, b) => a.stepOrder - b.stepOrder)[0];
}
