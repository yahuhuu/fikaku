import { prismaWalletRepository } from "../repositories/prisma-wallet.repository";

export async function getWallets(userId: string) {
  return prismaWalletRepository.listByUser(userId);
}
