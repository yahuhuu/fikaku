import { describe, expect, it } from "vitest";
import { calculateAssetAllocation } from "./asset-allocation.service";
import type { AssetListItem } from "../repositories/asset.repository";

function asset(overrides: Partial<AssetListItem>): AssetListItem {
  return {
    id: "asset_1",
    userId: "user_1",
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
    platform: "Stockbit",
    notes: null,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    ...overrides,
  };
}

describe("calculateAssetAllocation", () => {
  it("groups assets by type with amount and portfolio percentage", () => {
    const allocation = calculateAssetAllocation([
      asset({ id: "stock_1", type: "STOCK", currentValue: 900000 }),
      asset({ id: "stock_2", type: "STOCK", currentValue: 100000 }),
      asset({ id: "crypto_1", type: "CRYPTO", currentValue: 500000 }),
    ]);

    expect(allocation).toEqual([
      { type: "STOCK", currentValue: 1000000, percentage: 66.67, assetCount: 2 },
      { type: "CRYPTO", currentValue: 500000, percentage: 33.33, assetCount: 1 },
    ]);
  });

  it("returns empty allocation when there are no assets", () => {
    expect(calculateAssetAllocation([])).toEqual([]);
  });
});
