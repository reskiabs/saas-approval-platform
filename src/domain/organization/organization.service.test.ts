import { describe, expect, it } from "vitest";
import { createOrganization } from "./organization.service";

describe("organization.service", () => {
  it("should create organization with name", () => {
    const org = createOrganization("Test Org");

    expect(org.name).toBe("Test Org");
    expect(org.id).toBeDefined();
    expect(org.createdAt).toBeInstanceOf(Date);
  });
});
