import type { FamilyRepository } from "@/features/families/repositories/family.repository";
import { assetSchema, type AssetInput } from "../schemas/asset.schema";
import type { AssetListItem, AssetRepository } from "../repositories/asset.repository";
import { deriveAssetValues, normalizeSymbol } from "./asset-calculations.service";

type Dependencies = { userId: string; assetRepository: AssetRepository; familyRepository: FamilyRepository };
type Result = { ok: true; data: AssetListItem } | { ok: false; error: string };

export async function updateAsset(id: string, input: AssetInput, dependencies: Dependencies): Promise<Result> {
  if (!id) return { ok: false, error: "Asset id is required" };
  const existing = await dependencies.assetRepository.findById(id);
  if (!existing) return { ok: false, error: "Asset not found" };

  if (existing.familyId) {
    const canEdit = await dependencies.familyRepository.isMember({ familyId: existing.familyId, userId: dependencies.userId });
    if (!canEdit) return { ok: false, error: "You are not allowed to edit this asset" };
  } else if (existing.userId !== dependencies.userId) {
    return { ok: false, error: "Asset not found" };
  }

  const parsed = assetSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid asset" };

  const familyId = existing.familyId ?? parsed.data.familyId;
  const derived = deriveAssetValues({ valuationMode: parsed.data.valuationMode, quantity: parsed.data.quantity, currentPrice: parsed.data.currentPrice, costBasis: parsed.data.costBasis, currentValue: parsed.data.currentValue });
  const asset = await dependencies.assetRepository.updateById(id, {
    familyId: familyId ?? undefined,
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

  if (!asset) return { ok: false, error: "Asset not found" };
  return { ok: true, data: asset };
}
