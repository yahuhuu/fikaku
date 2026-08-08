import { describe, expect, it } from "vitest";
import { createAsset } from "./create-asset.service";
import type { AssetRepository } from "../repositories/asset.repository";
import type { FamilyRepository } from "@/features/families/repositories/family.repository";

function repository(): AssetRepository {
  return {
    async create(data) { return { id: "asset_1", createdAt: new Date("2026-01-01"), updatedAt: new Date("2026-01-01"), ...data, familyId: data.familyId ?? null, symbol: data.symbol ?? null, quantity: data.quantity ?? null, averageCost: data.averageCost ?? null, currentPrice: data.currentPrice ?? null, platform: data.platform ?? null, notes: data.notes ?? null }; },
    async listVisible() { return []; },
    async findById() { return null; },
    async updateById() { return null; },
    async deleteById() { return false; },
  };
}

function familyRepository(isMember: boolean): FamilyRepository {
  return {
    async create() { throw new Error("unused"); }, async listForUser() { return []; }, async addMemberByEmail() { return { ok: false, error: "unused" }; }, async updateSettings() { return null; }, async deleteByOwner() { return false; },
    async isMember() { return isMember; }, async canEditFamilyTransaction() { return isMember; }, async canDeleteFamilyTransaction() { return false; },
  };
}

describe("createAsset", () => {
  it("creates a personal quantity-price asset and derives current value", async () => {
    const result = await createAsset({ name: "BBCA", symbol: "BBCA", type: "STOCK", valuationMode: "QUANTITY_PRICE", quantity: "100", currentPrice: "9500", costBasis: "900000" }, { userId: "user_1", assetRepository: repository(), familyRepository: familyRepository(false) });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.currentValue).toBe(950000);
  });

  it("rejects family asset creation when user is not family member", async () => {
    const result = await createAsset({ name: "Dana Pendidikan", type: "DIGITAL_BANK", valuationMode: "MANUAL_VALUE", familyId: "fam_1", currentValue: "1000000", costBasis: "1000000" }, { userId: "user_1", assetRepository: repository(), familyRepository: familyRepository(false) });
    expect(result).toEqual({ ok: false, error: "Selected family is not available" });
  });
});
