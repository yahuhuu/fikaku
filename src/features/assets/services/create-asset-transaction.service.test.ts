import { describe, expect, it } from "vitest";
import { createAssetTransaction } from "./create-asset-transaction.service";
import type { AssetListItem, AssetRepository, AssetTransactionRepository } from "../repositories/asset.repository";
import type { FamilyRepository } from "@/features/families/repositories/family.repository";

function createAsset(overrides: Partial<AssetListItem> = {}): AssetListItem {
  return {
    id: "asset_1",
    userId: "creator",
    familyId: null,
    name: "BBCA",
    symbol: "BBCA",
    type: "STOCK",
    valuationMode: "QUANTITY_PRICE",
    quantity: 100,
    averageCost: 9000,
    currentPrice: 9500,
    costBasis: 900000,
    currentValue: 950000,
    platform: null,
    notes: null,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    ...overrides,
  };
}

function assetRepository(asset: AssetListItem): AssetRepository {
  return {
    async create() { throw new Error("unused"); },
    async listVisible() { return []; },
    async findById() { return asset; },
    async updateById(_id, data) { return { ...asset, ...data, updatedAt: new Date("2026-01-02") }; },
    async deleteById() { return false; },
  };
}

function transactionRepository(): AssetTransactionRepository {
  return {
    async create(data) {
      return { id: "trx_1", createdAt: new Date("2026-01-02"), updatedAt: new Date("2026-01-02"), ...data };
    },
    async listByAsset() { return []; },
  };
}

function familyRepository(isMember: boolean): FamilyRepository {
  return {
    async create() { throw new Error("unused"); },
    async listForUser() { return []; },
    async addMemberByEmail() { return { ok: false, error: "unused" }; },
    async updateSettings() { return null; },
    async deleteByOwner() { return false; },
    async isMember() { return isMember; },
    async canEditFamilyTransaction() { return isMember; },
    async canDeleteFamilyTransaction() { return false; },
  };
}

describe("createAssetTransaction", () => {
  it("handles BUY by increasing quantity, cost basis, average cost, and current value", async () => {
    const result = await createAssetTransaction({ assetId: "asset_1", type: "BUY", quantity: "50", price: "10000", amount: "500000", date: "2026-01-02" }, { userId: "creator", assetRepository: assetRepository(createAsset()), assetTransactionRepository: transactionRepository(), familyRepository: familyRepository(false) });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.asset.quantity).toBe(150);
    expect(result.asset.costBasis).toBe(1400000);
    expect(result.asset.averageCost).toBeCloseTo(9333.333333333334);
    expect(result.asset.currentValue).toBe(1425000);
  });

  it("handles SELL by decreasing quantity and removing cost basis by average cost", async () => {
    const result = await createAssetTransaction({ assetId: "asset_1", type: "SELL", quantity: "40", price: "10000", amount: "400000", date: "2026-01-02" }, { userId: "creator", assetRepository: assetRepository(createAsset()), assetTransactionRepository: transactionRepository(), familyRepository: familyRepository(false) });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.asset.quantity).toBe(60);
    expect(result.asset.costBasis).toBe(540000);
    expect(result.asset.averageCost).toBe(9000);
    expect(result.asset.currentValue).toBe(570000);
  });

  it("handles TOP_UP manual asset by increasing cost basis and current value", async () => {
    const asset = createAsset({ valuationMode: "MANUAL_VALUE", quantity: null, averageCost: null, currentPrice: null, costBasis: 1000000, currentValue: 1000000, type: "DIGITAL_BANK" });
    const result = await createAssetTransaction({ assetId: "asset_1", type: "TOP_UP", amount: "250000", date: "2026-01-02" }, { userId: "creator", assetRepository: assetRepository(asset), assetTransactionRepository: transactionRepository(), familyRepository: familyRepository(false) });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.asset.costBasis).toBe(1250000);
    expect(result.asset.currentValue).toBe(1250000);
  });

  it("handles WITHDRAW manual asset by decreasing cost basis and current value", async () => {
    const asset = createAsset({ valuationMode: "MANUAL_VALUE", quantity: null, averageCost: null, currentPrice: null, costBasis: 1000000, currentValue: 1200000, type: "DIGITAL_BANK" });
    const result = await createAssetTransaction({ assetId: "asset_1", type: "WITHDRAW", amount: "200000", date: "2026-01-02" }, { userId: "creator", assetRepository: assetRepository(asset), assetTransactionRepository: transactionRepository(), familyRepository: familyRepository(false) });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.asset.costBasis).toBe(800000);
    expect(result.asset.currentValue).toBe(1000000);
  });

  it("allows a family member to add an asset transaction", async () => {
    const asset = createAsset({ familyId: "fam_1", userId: "creator" });
    const result = await createAssetTransaction({ assetId: "asset_1", type: "BUY", quantity: "1", price: "10000", amount: "10000", date: "2026-01-02" }, { userId: "member", assetRepository: assetRepository(asset), assetTransactionRepository: transactionRepository(), familyRepository: familyRepository(true) });

    expect(result.ok).toBe(true);
  });
});
