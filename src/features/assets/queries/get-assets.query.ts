import { prismaFamilyRepository } from "@/features/families/repositories/prisma-family.repository";
import { prismaAssetRepository, prismaAssetTransactionRepository } from "../repositories/prisma-asset.repository";
import { calculateAssetAllocation } from "../services/asset-allocation.service";
import { calculateAssetSummary } from "../services/asset-summary.service";

export async function getVisibleAssetsData(userId: string) {
  const families = await prismaFamilyRepository.listForUser(userId);
  const assets = await prismaAssetRepository.listVisible({ userId, familyIds: families.map((family) => family.id) });
  return { assets, families, summary: calculateAssetSummary(assets), allocation: calculateAssetAllocation(assets) };
}

export async function getAssetsPageData(userId: string) {
  const { assets, families, summary, allocation } = await getVisibleAssetsData(userId);
  const transactionEntries = await Promise.all(assets.map(async (asset) => [asset.id, await prismaAssetTransactionRepository.listByAsset(asset.id)] as const));
  return { assets, families, summary, allocation, transactionsByAsset: Object.fromEntries(transactionEntries) };
}
