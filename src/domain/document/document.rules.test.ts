import { describe, expect, it } from "vitest";
import { DocumentStatus } from "./document.enums";
import { isDraft, isFinal, isInReview, isPending } from "./document.rules";
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

describe("document.rules", () => {
  describe("isDraft", () => {
    it("should return true if status is DRAFT", () => {
      const doc = createMockDocument(DocumentStatus.DRAFT);
      expect(isDraft(doc)).toBe(true);
    });

    it("should return false if status is not DRAFT", () => {
      const doc = createMockDocument(DocumentStatus.APPROVED);
      expect(isDraft(doc)).toBe(false);
    });
  });

  describe("isPending", () => {
    it("should return true if status is PENDING", () => {
      const doc = createMockDocument(DocumentStatus.PENDING);
      expect(isPending(doc)).toBe(true);
    });

    it("should return false otherwise", () => {
      const doc = createMockDocument(DocumentStatus.DRAFT);
      expect(isPending(doc)).toBe(false);
    });
  });

  describe("isInReview", () => {
    it("should return true if status is IN_REVIEW", () => {
      const doc = createMockDocument(DocumentStatus.IN_REVIEW);
      expect(isInReview(doc)).toBe(true);
    });

    it("should return false otherwise", () => {
      const doc = createMockDocument(DocumentStatus.APPROVED);
      expect(isInReview(doc)).toBe(false);
    });
  });

  describe("isFinal", () => {
    it("should return true for APPROVED", () => {
      const doc = createMockDocument(DocumentStatus.APPROVED);
      expect(isFinal(doc)).toBe(true);
    });

    it("should return true for REJECTED", () => {
      const doc = createMockDocument(DocumentStatus.REJECTED);
      expect(isFinal(doc)).toBe(true);
    });

    it("should return true for CANCELLED", () => {
      const doc = createMockDocument(DocumentStatus.CANCELLED);
      expect(isFinal(doc)).toBe(true);
    });

    it("should return false for non-final status", () => {
      const doc = createMockDocument(DocumentStatus.DRAFT);
      expect(isFinal(doc)).toBe(false);
    });
  });
});
