import { ApprovalStatus } from "./approval.enums";
import { getCurrentActiveStep } from "./approval.rules";
import { ApprovalStep } from "./approval.types";

/**
 * Approve current step
 */
export function approveStep(
  steps: ApprovalStep[],
  approverId: string,
  note?: string,
): ApprovalStep[] {
  const activeStep = getCurrentActiveStep(steps);

  if (!activeStep) {
    throw new Error("No active approval step");
  }

  if (activeStep.approverId !== approverId) {
    throw new Error("You are not allowed to approve this step");
  }

  return steps.map((step) =>
    step.id === activeStep.id
      ? {
          ...step,
          status: ApprovalStatus.APPROVED,
          note,
          actedAt: new Date(),
        }
      : step,
  );
}

/**
 * Reject current step
 */
export function rejectStep(
  steps: ApprovalStep[],
  approverId: string,
  note?: string,
): ApprovalStep[] {
  const activeStep = getCurrentActiveStep(steps);

  if (!activeStep) {
    throw new Error("No active approval step");
  }

  if (activeStep.approverId !== approverId) {
    throw new Error("You are not allowed to reject this step");
  }

  return steps.map((step) =>
    step.id === activeStep.id
      ? {
          ...step,
          status: ApprovalStatus.REJECTED,
          note,
          actedAt: new Date(),
        }
      : step,
  );
}
