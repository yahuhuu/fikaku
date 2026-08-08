import { describe, expect, it } from "vitest";
import { calculateAssetSummary } from "./asset-summary.service";
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

describe("calculateAssetSummary", () => {
  it("summarizes total value, cost basis, and gain loss", () => {
    const summary = calculateAssetSummary([
      asset({ currentValue: 950000, costBasis: 900000, type: "STOCK" }),
      asset({ id: "asset_2", currentValue: 500000, costBasis: 600000, type: "CRYPTO" }),
    ]);

    expect(summary).toEqual({
      totalCurrentValue: 1450000,
      totalCostBasis: 1500000,
      totalGainLoss: -50000,
      totalGainLossPercent: -3.3333333333333335,
      byType: [
        { type: "STOCK", currentValue: 950000 },
        { type: "CRYPTO", currentValue: 500000 },
      ],
    });
  });
});
