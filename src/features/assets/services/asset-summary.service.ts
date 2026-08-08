import type { AssetListItem, AssetType } from "../repositories/asset.repository";

export type AssetSummary = {
  totalCurrentValue: number;
  totalCostBasis: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  byType: { type: AssetType; currentValue: number }[];
};

export function calculateAssetSummary(assets: AssetListItem[]): AssetSummary {
  const totalCurrentValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalCostBasis = assets.reduce((sum, asset) => sum + asset.costBasis, 0);
  const totalGainLoss = totalCurrentValue - totalCostBasis;
  const byTypeMap = new Map<AssetType, number>();
  for (const asset of assets) byTypeMap.set(asset.type, (byTypeMap.get(asset.type) ?? 0) + asset.currentValue);
  return {
    totalCurrentValue,
    totalCostBasis,
    totalGainLoss,
    totalGainLossPercent: totalCostBasis > 0 ? (totalGainLoss / totalCostBasis) * 100 : 0,
    byType: Array.from(byTypeMap.entries()).map(([type, currentValue]) => ({ type, currentValue })),
  };
}
