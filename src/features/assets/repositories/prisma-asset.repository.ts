import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type { AssetListItem, AssetRepository, AssetTransactionListItem, AssetTransactionRepository } from "./asset.repository";

function decimalToNumber(value: Prisma.Decimal | null) {
  return value ? value.toNumber() : null;
}

function toAssetListItem(asset: {
  id: string;
  userId: string;
  familyId: string | null;
  name: string;
  symbol: string | null;
  type: AssetListItem["type"];
  valuationMode: AssetListItem["valuationMode"];
  quantity: Prisma.Decimal | null;
  averageCost: Prisma.Decimal | null;
  currentPrice: Prisma.Decimal | null;
  costBasis: Prisma.Decimal;
  currentValue: Prisma.Decimal;
  platform: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}): AssetListItem {
  return {
    id: asset.id,
    userId: asset.userId,
    familyId: asset.familyId,
    name: asset.name,
    symbol: asset.symbol,
    type: asset.type,
    valuationMode: asset.valuationMode,
    quantity: decimalToNumber(asset.quantity),
    averageCost: decimalToNumber(asset.averageCost),
    currentPrice: decimalToNumber(asset.currentPrice),
    costBasis: asset.costBasis.toNumber(),
    currentValue: asset.currentValue.toNumber(),
    platform: asset.platform,
    notes: asset.notes,
    createdAt: asset.createdAt,
    updatedAt: asset.updatedAt,
  };
}

function toAssetTransactionListItem(transaction: {
  id: string;
  assetId: string;
  userId: string;
  type: AssetTransactionListItem["type"];
  quantity: Prisma.Decimal | null;
  price: Prisma.Decimal | null;
  amount: Prisma.Decimal;
  date: Date;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}): AssetTransactionListItem {
  return {
    id: transaction.id,
    assetId: transaction.assetId,
    userId: transaction.userId,
    type: transaction.type,
    quantity: decimalToNumber(transaction.quantity),
    price: decimalToNumber(transaction.price),
    amount: transaction.amount.toNumber(),
    date: transaction.date,
    notes: transaction.notes,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
}

export const prismaAssetRepository: AssetRepository = {
  async create(data) {
    const asset = await prisma.asset.create({
      data: {
        userId: data.userId,
        familyId: data.familyId,
        name: data.name,
        symbol: data.symbol,
        type: data.type,
        valuationMode: data.valuationMode,
        quantity: data.quantity,
        averageCost: data.averageCost,
        currentPrice: data.currentPrice,
        costBasis: data.costBasis,
        currentValue: data.currentValue,
        platform: data.platform,
        notes: data.notes,
      },
    });
    return toAssetListItem(asset);
  },

  async listVisible(data) {
    const assets = await prisma.asset.findMany({
      where: {
        OR: [
          { userId: data.userId, familyId: null },
          ...(data.familyIds.length ? [{ familyId: { in: data.familyIds } }] : []),
        ],
      },
      orderBy: [{ currentValue: "desc" }, { createdAt: "desc" }],
    });
    return assets.map(toAssetListItem);
  },

  async findById(id) {
    const asset = await prisma.asset.findUnique({ where: { id } });
    return asset ? toAssetListItem(asset) : null;
  },

  async updateById(id, data) {
    const asset = await prisma.asset.update({
      where: { id },
      data: {
        familyId: data.familyId,
        name: data.name,
        symbol: data.symbol,
        type: data.type,
        valuationMode: data.valuationMode,
        quantity: data.quantity,
        averageCost: data.averageCost,
        currentPrice: data.currentPrice,
        costBasis: data.costBasis,
        currentValue: data.currentValue,
        platform: data.platform,
        notes: data.notes,
      },
    });
    return toAssetListItem(asset);
  },

  async deleteById(id) {
    const result = await prisma.asset.deleteMany({ where: { id } });
    return result.count > 0;
  },
};

export const prismaAssetTransactionRepository: AssetTransactionRepository = {
  async create(data) {
    const transaction = await prisma.assetTransaction.create({
      data: {
        assetId: data.assetId,
        userId: data.userId,
        type: data.type,
        quantity: data.quantity,
        price: data.price,
        amount: data.amount,
        date: data.date,
        notes: data.notes,
      },
    });
    return toAssetTransactionListItem(transaction);
  },

  async listByAsset(assetId) {
    const transactions = await prisma.assetTransaction.findMany({
      where: { assetId },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
    return transactions.map(toAssetTransactionListItem);
  },
};
