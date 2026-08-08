import type { FamilyRepository } from "@/features/families/repositories/family.repository";
import { assetSchema, type AssetInput } from "../schemas/asset.schema";
import type { AssetListItem, AssetRepository } from "../repositories/asset.repository";
import { deriveAssetValues, normalizeSymbol } from "./asset-calculations.service";

type Dependencies = { userId: string; assetRepository: AssetRepository; familyRepository: FamilyRepository };
type Result = { ok: true; data: AssetListItem } | { ok: false; error: string };

export async function createAsset(input: AssetInput, dependencies: Dependencies): Promise<Result> {
  const parsed = assetSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid asset" };

  if (parsed.data.familyId) {
    const isMember = await dependencies.familyRepository.isMember({ familyId: parsed.data.familyId, userId: dependencies.userId });
    if (!isMember) return { ok: false, error: "Selected family is not available" };
  }

  const derived = deriveAssetValues({
    valuationMode: parsed.data.valuationMode,
    quantity: parsed.data.quantity,
    currentPrice: parsed.data.currentPrice,
    costBasis: parsed.data.costBasis,
    currentValue: parsed.data.currentValue,
  });

  const asset = await dependencies.assetRepository.create({
    userId: dependencies.userId,
    familyId: parsed.data.familyId,
    name: parsed.data.name,
    symbol: normalizeSymbol(parsed.data.symbol),
    type: parsed.data.type,
    valuationMode: parsed.data.valuationMode,
    quantity: derived.quantity,
    averageCost: derived.averageCost,
    currentPrice: derived.currentPrice,
    costBasis: parsed.data.costBasis,
    currentValue: derived.currentValue,
    platform: parsed.data.platform,
    notes: parsed.data.notes,
  });

  return { ok: true, data: asset };
}
