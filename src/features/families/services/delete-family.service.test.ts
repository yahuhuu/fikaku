import { describe, expect, it } from "vitest";
import { deleteFamily } from "./delete-family.service";
import type { FamilyRepository } from "../repositories/family.repository";

function createRepository(deleted: boolean): FamilyRepository {
  return {
    async create() { throw new Error("unused"); },
    async addMemberByEmail() { return { ok: false, error: "unused" }; },
    async listForUser() { return []; },
    async updateSettings() { return null; },
    async deleteByOwner() { return deleted; },
    async isMember() { return false; },
    async canEditFamilyTransaction() { return false; },
    async canDeleteFamilyTransaction() { return false; },
  };
}

describe("deleteFamily", () => {
  it("deletes a family when the current user is owner", async () => {
    await expect(deleteFamily({ familyId: "fam_1" }, { userId: "user_1", familyRepository: createRepository(true) })).resolves.toEqual({ ok: true });
  });

  it("rejects deleting a family when the user is not owner", async () => {
    await expect(deleteFamily({ familyId: "fam_1" }, { userId: "user_1", familyRepository: createRepository(false) })).resolves.toEqual({ ok: false, error: "Only family owner can delete family" });
  });
});
