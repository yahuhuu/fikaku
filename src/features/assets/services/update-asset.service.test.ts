import { describe, expect, it } from "vitest";
import { updateAsset } from "./update-asset.service";
import type { AssetListItem, AssetRepository } from "../repositories/asset.repository";
import type { FamilyRepository } from "@/features/families/repositories/family.repository";

const existing: AssetListItem = { id: "asset_1", userId: "creator", familyId: "fam_1", name: "BTC", symbol: "BTC", type: "CRYPTO", valuationMode: "QUANTITY_PRICE", quantity: 1, averageCost: null, currentPrice: 100, costBasis: 80, currentValue: 100, platform: null, notes: null, createdAt: new Date(), updatedAt: new Date() };
function repo(): AssetRepository { return { async create() { throw new Error("unused"); }, async listVisible() { return []; }, async findById() { return existing; }, async updateById(_id, data) { return { ...existing, ...data, updatedAt: new Date() }; }, async deleteById() { return false; } }; }
function familyRepo(isMember: boolean): FamilyRepository { return { async create() { throw new Error("unused"); }, async listForUser() { return []; }, async addMemberByEmail() { return { ok: false, error: "unused" }; }, async updateSettings() { return null; }, async deleteByOwner() { return false; }, async isMember() { return isMember; }, async canEditFamilyTransaction() { return isMember; }, async canDeleteFamilyTransaction() { return false; } }; }

describe("updateAsset", () => {
  it("allows a family member to update current price without an asset transaction", async () => {
    const result = await updateAsset("asset_1", { name: "BTC", symbol: "BTC", type: "CRYPTO", valuationMode: "QUANTITY_PRICE", quantity: "1", currentPrice: "120", costBasis: "80" }, { userId: "member", assetRepository: repo(), familyRepository: familyRepo(true) });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.currentValue).toBe(120);
  });
});
