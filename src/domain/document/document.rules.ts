import { DocumentStatus } from "./document.enums";
import { Document } from "./document.types";

export function isDraft(document: Document) {
  return document.status === DocumentStatus.DRAFT;
}

export function isPending(document: Document) {
  return document.status === DocumentStatus.PENDING;
}

export function isInReview(document: Document) {
  return document.status === DocumentStatus.IN_REVIEW;
}

export function isFinal(document: Document) {
  return (
    document.status === DocumentStatus.APPROVED ||
    document.status === DocumentStatus.REJECTED ||
    document.status === DocumentStatus.CANCELLED
  );
}
