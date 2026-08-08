import { describe, expect, it } from "vitest";
import { deleteAsset } from "./delete-asset.service";
import type { AssetListItem, AssetRepository } from "../repositories/asset.repository";
import type { FamilyRepository } from "@/features/families/repositories/family.repository";

const familyAsset: AssetListItem = { id: "asset_1", userId: "creator", familyId: "fam_1", name: "Gold", symbol: null, type: "GOLD", valuationMode: "MANUAL_VALUE", quantity: null, averageCost: null, currentPrice: null, costBasis: 100, currentValue: 120, platform: null, notes: null, createdAt: new Date(), updatedAt: new Date() };
function repo(asset = familyAsset): AssetRepository { return { async create() { throw new Error("unused"); }, async listVisible() { return []; }, async findById() { return asset; }, async updateById() { return null; }, async deleteById() { return true; } }; }
function familyRepo(owner: boolean): FamilyRepository { return { async create() { throw new Error("unused"); }, async listForUser() { return []; }, async addMemberByEmail() { return { ok: false, error: "unused" }; }, async updateSettings() { return null; }, async deleteByOwner() { return false; }, async isMember() { return true; }, async canEditFamilyTransaction() { return true; }, async canDeleteFamilyTransaction() { return owner; } }; }

describe("deleteAsset", () => {
  it("allows family asset creator to delete", async () => {
    await expect(deleteAsset("asset_1", { userId: "creator", assetRepository: repo(), familyRepository: familyRepo(false) })).resolves.toEqual({ ok: true });
  });

  it("allows family owner to delete another member asset", async () => {
    await expect(deleteAsset("asset_1", { userId: "owner", assetRepository: repo(), familyRepository: familyRepo(true) })).resolves.toEqual({ ok: true });
  });

  it("rejects non-owner non-creator deletion", async () => {
    await expect(deleteAsset("asset_1", { userId: "member", assetRepository: repo(), familyRepository: familyRepo(false) })).resolves.toEqual({ ok: false, error: "You are not allowed to delete this asset" });
  });
});
