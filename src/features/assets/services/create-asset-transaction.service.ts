import type { FamilyRepository } from "@/features/families/repositories/family.repository";
import { assetTransactionSchema, type AssetTransactionInput } from "../schemas/asset-transaction.schema";
import type { AssetListItem, AssetRepository, AssetTransactionListItem, AssetTransactionRepository, UpdateAssetData } from "../repositories/asset.repository";

type Dependencies = {
  userId: string;
  assetRepository: AssetRepository;
  assetTransactionRepository: AssetTransactionRepository;
  familyRepository: FamilyRepository;
};

type Result = { ok: true; transaction: AssetTransactionListItem; asset: AssetListItem } | { ok: false; error: string };

function withCurrentValue(data: UpdateAssetData): UpdateAssetData {
  if (data.valuationMode === "QUANTITY_PRICE") {
    const quantity = data.quantity ?? 0;
    const currentPrice = data.currentPrice ?? 0;
    return { ...data, currentValue: quantity * currentPrice, averageCost: quantity > 0 ? data.costBasis / quantity : 0 };
  }
  return data;
}

function applyTransaction(asset: AssetListItem, input: { type: string; quantity?: number; price?: number; amount: number }): UpdateAssetData | { error: string } {
  const base: UpdateAssetData = {
    familyId: asset.familyId ?? undefined,
    name: asset.name,
    symbol: asset.symbol ?? undefined,
    type: asset.type,
    valuationMode: asset.valuationMode,
    quantity: asset.quantity ?? undefined,
    averageCost: asset.averageCost ?? undefined,
    currentPrice: asset.currentPrice ?? undefined,
    costBasis: asset.costBasis,
    currentValue: asset.currentValue,
    platform: asset.platform ?? undefined,
    notes: asset.notes ?? undefined,
  };

  if (asset.valuationMode === "QUANTITY_PRICE") {
    const currentQuantity = asset.quantity ?? 0;
    const currentPrice = asset.currentPrice ?? input.price ?? 0;
    const averageCost = asset.averageCost ?? (currentQuantity > 0 ? asset.costBasis / currentQuantity : 0);

    if (input.type === "BUY") {
      const quantity = currentQuantity + (input.quantity ?? 0);
      const costBasis = asset.costBasis + input.amount;
      return withCurrentValue({ ...base, quantity, costBasis, currentPrice, averageCost: quantity > 0 ? costBasis / quantity : 0 });
    }

    if (input.type === "SELL") {
      const quantitySold = input.quantity ?? 0;
      if (quantitySold > currentQuantity) return { error: "Sell quantity exceeds current quantity" };
      const quantity = currentQuantity - quantitySold;
      const costBasis = Math.max(0, asset.costBasis - averageCost * quantitySold);
      return withCurrentValue({ ...base, quantity, costBasis, currentPrice, averageCost: quantity > 0 ? costBasis / quantity : 0 });
    }
  }

  if (input.type === "TOP_UP") return { ...base, costBasis: asset.costBasis + input.amount, currentValue: asset.currentValue + input.amount };
  if (input.type === "WITHDRAW") return { ...base, costBasis: Math.max(0, asset.costBasis - input.amount), currentValue: Math.max(0, asset.currentValue - input.amount) };
  if (input.type === "DIVIDEND" || input.type === "INTEREST") return { ...base, currentValue: asset.currentValue + input.amount };
  if (input.type === "FEE") return { ...base, currentValue: Math.max(0, asset.currentValue - input.amount) };
  if (input.type === "ADJUSTMENT") return { ...base, currentValue: input.amount };

  return { error: "Transaction type is not supported for this asset" };
}

export async function createAssetTransaction(input: AssetTransactionInput, dependencies: Dependencies): Promise<Result> {
  const parsed = assetTransactionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid asset transaction" };

  const asset = await dependencies.assetRepository.findById(parsed.data.assetId);
  if (!asset) return { ok: false, error: "Asset not found" };

  if (asset.familyId) {
    const isMember = await dependencies.familyRepository.isMember({ familyId: asset.familyId, userId: dependencies.userId });
    if (!isMember) return { ok: false, error: "You are not allowed to add transaction to this asset" };
  } else if (asset.userId !== dependencies.userId) {
    return { ok: false, error: "Asset not found" };
  }

  const updatedData = applyTransaction(asset, parsed.data);
  if ("error" in updatedData) return { ok: false, error: updatedData.error };

  const updatedAsset = await dependencies.assetRepository.updateById(asset.id, updatedData);
  if (!updatedAsset) return { ok: false, error: "Asset not found" };

  const transaction = await dependencies.assetTransactionRepository.create({
    assetId: asset.id,
    userId: dependencies.userId,
    type: parsed.data.type,
    quantity: parsed.data.quantity,
    price: parsed.data.price,
    amount: parsed.data.amount,
    date: parsed.data.date,
    notes: parsed.data.notes,
  });

  return { ok: true, transaction, asset: updatedAsset };
}
