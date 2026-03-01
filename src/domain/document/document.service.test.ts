import { describe, expect, it } from "vitest";
import { DocumentStatus } from "./document.enums";
import {
  approveDocument,
  rejectDocument,
  startReview,
  submitDocument,
} from "./document.service";
import type { Document } from "./document.types";

function createMockDocument(status: DocumentStatus): Document {
  return {
    id: "doc-1",
    title: "Test Document",
    description: "Test",
    fileUrl: "/file.pdf",
    createdBy: "user-1",
    status,
    currentStep: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

describe("document.service", () => {
  describe("submitDocument", () => {
    it("should move DRAFT → PENDING", () => {
      const draftDoc = createMockDocument(DocumentStatus.DRAFT);

      const result = submitDocument(draftDoc);

      expect(result.status).toBe(DocumentStatus.PENDING);
    });

    it("should throw error if not DRAFT", () => {
      const approvedDoc = createMockDocument(DocumentStatus.APPROVED);

      expect(() => submitDocument(approvedDoc)).toThrowError(
        "Only draft document can be submitted",
      );
    });
  });

  describe("startReview", () => {
    it("should move PENDING → IN_REVIEW", () => {
      const pendingDoc = createMockDocument(DocumentStatus.PENDING);

      const result = startReview(pendingDoc);

      expect(result.status).toBe(DocumentStatus.IN_REVIEW);
    });

    it("should throw if not PENDING", () => {
      const draftDoc = createMockDocument(DocumentStatus.DRAFT);

      expect(() => startReview(draftDoc)).toThrowError(
        "Document must be pending to start review",
      );
    });
  });

  describe("approveDocument", () => {
    it("should move IN_REVIEW → APPROVED", () => {
      const reviewDoc = createMockDocument(DocumentStatus.IN_REVIEW);

      const result = approveDocument(reviewDoc);

      expect(result.status).toBe(DocumentStatus.APPROVED);
    });

    it("should throw if not IN_REVIEW", () => {
      const draftDoc = createMockDocument(DocumentStatus.DRAFT);

      expect(() => approveDocument(draftDoc)).toThrowError(
        "Document must be in review",
      );
    });
  });

  describe("rejectDocument", () => {
    it("should move IN_REVIEW → REJECTED", () => {
      const reviewDoc = createMockDocument(DocumentStatus.IN_REVIEW);

      const result = rejectDocument(reviewDoc);

      expect(result.status).toBe(DocumentStatus.REJECTED);
    });

    it("should throw if not IN_REVIEW", () => {
      const draftDoc = createMockDocument(DocumentStatus.DRAFT);

      expect(() => rejectDocument(draftDoc)).toThrowError(
        "Document must be in review",
      );
    });
  });
});
