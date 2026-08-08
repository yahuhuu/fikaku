import type { FamilyRepository } from "@/features/families/repositories/family.repository";
import type { AssetRepository } from "../repositories/asset.repository";

type Dependencies = { userId: string; assetRepository: AssetRepository; familyRepository: FamilyRepository };
type Result = { ok: true } | { ok: false; error: string };

export async function deleteAsset(id: string, dependencies: Dependencies): Promise<Result> {
  if (!id) return { ok: false, error: "Asset id is required" };
  const asset = await dependencies.assetRepository.findById(id);
  if (!asset) return { ok: false, error: "Asset not found" };

  if (asset.familyId) {
    const isCreator = asset.userId === dependencies.userId;
    const isOwner = await dependencies.familyRepository.canDeleteFamilyTransaction({ familyId: asset.familyId, transactionOwnerId: asset.userId, userId: dependencies.userId });
    if (!isCreator && !isOwner) return { ok: false, error: "You are not allowed to delete this asset" };
  } else if (asset.userId !== dependencies.userId) {
    return { ok: false, error: "Asset not found" };
  }

  await dependencies.assetRepository.deleteById(id);
  return { ok: true };
}
