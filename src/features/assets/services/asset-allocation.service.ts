import type { AssetListItem, AssetType } from "../repositories/asset.repository";

export type AssetAllocationItem = {
  type: AssetType;
  currentValue: number;
  percentage: number;
  assetCount: number;
};

function roundPercent(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculateAssetAllocation(assets: AssetListItem[]): AssetAllocationItem[] {
  const totalCurrentValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  if (totalCurrentValue <= 0) return [];

  const grouped = new Map<AssetType, { currentValue: number; assetCount: number }>();
  for (const asset of assets) {
    const existing = grouped.get(asset.type) ?? { currentValue: 0, assetCount: 0 };
    grouped.set(asset.type, {
      currentValue: existing.currentValue + asset.currentValue,
      assetCount: existing.assetCount + 1,
    });
  }

  return Array.from(grouped.entries())
    .map(([type, value]) => ({
      type,
      currentValue: value.currentValue,
      percentage: roundPercent((value.currentValue / totalCurrentValue) * 100),
      assetCount: value.assetCount,
    }))
    .sort((a, b) => b.currentValue - a.currentValue || a.type.localeCompare(b.type));
}
