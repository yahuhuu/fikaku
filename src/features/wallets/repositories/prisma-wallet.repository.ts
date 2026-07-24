import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type { CreateWalletData, WalletListItem, WalletRepository } from "./wallet.repository";

function toWalletListItem(wallet: {
  id: string;
  userId: string;
  name: string;
  balance: Prisma.Decimal;
  currency: string;
}): WalletListItem {
  return {
    id: wallet.id,
    userId: wallet.userId,
    name: wallet.name,
    balance: wallet.balance.toNumber(),
    currency: wallet.currency,
  };
}

export const prismaWalletRepository: WalletRepository = {
  async create(data: CreateWalletData): Promise<WalletListItem> {
    const wallet = await prisma.wallet.create({ data });
    return toWalletListItem(wallet);
  },

  async listByUser(userId: string): Promise<WalletListItem[]> {
    const wallets = await prisma.wallet.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    return wallets.map(toWalletListItem);
  },

  async deleteByUser(id: string, userId: string): Promise<boolean> {
    const result = await prisma.wallet.deleteMany({ where: { id, userId } });
    return result.count > 0;
  },
};
