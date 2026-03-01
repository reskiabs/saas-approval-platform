import { DocumentStatus } from "./document.enums";
import { isDraft, isInReview } from "./document.rules";
import { Document } from "./document.types";

/**
 * Submit document (DRAFT → PENDING)
 */
export function submitDocument(document: Document): Document {
  if (!isDraft(document)) {
    throw new Error("Only draft document can be submitted");
  }

  return {
    ...document,
    status: DocumentStatus.PENDING,
    updatedAt: new Date(),
  };
}

/**
 * Start review (PENDING → IN_REVIEW)
 * Biasanya ini dipanggil otomatis saat approval step pertama aktif
 */
export function startReview(document: Document): Document {
  if (document.status !== DocumentStatus.PENDING) {
    throw new Error("Document must be pending to start review");
  }

  return {
    ...document,
    status: DocumentStatus.IN_REVIEW,
    updatedAt: new Date(),
  };
}

/**
 * Approve document (final state)
 */
export function approveDocument(document: Document): Document {
  if (!isInReview(document)) {
    throw new Error("Document must be in review");
  }

  return {
    ...document,
    status: DocumentStatus.APPROVED,
    updatedAt: new Date(),
  };
}

/**
 * Reject document
 */
export function rejectDocument(document: Document): Document {
  if (!isInReview(document)) {
    throw new Error("Document must be in review");
  }

  return {
    ...document,
    status: DocumentStatus.REJECTED,
    updatedAt: new Date(),
  };
}
