import { describe, expect, it } from "vitest";
import { createFamily } from "./create-family.service";
import type { FamilyRepository } from "../repositories/family.repository";

function createRepository(): FamilyRepository {
  return {
    async create(data) {
      return { id: "fam_1", name: data.name, transactionMode: data.transactionMode, role: "OWNER", memberCount: 1 };
    },
    async addMemberByEmail() { return { ok: false, error: "unused" }; },
    async listForUser() { return []; },
    async updateSettings() { return null; },
    async isMember() { return false; },
    async canEditFamilyTransaction() { return false; },
    async canDeleteFamilyTransaction() { return false; },
  };
}

describe("createFamily", () => {
  it("creates an owner family with selected transaction mode", async () => {
    const result = await createFamily({ name: "Keluarga Rumah", transactionMode: "ALLOW_PERSONAL" }, { userId: "user_1", familyRepository: createRepository() });
    expect(result).toEqual({ ok: true, data: { id: "fam_1", name: "Keluarga Rumah", transactionMode: "ALLOW_PERSONAL", role: "OWNER", memberCount: 1 } });
  });
});
