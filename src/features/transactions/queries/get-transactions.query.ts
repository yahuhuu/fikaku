import { prismaTransactionRepository } from "../repositories/prisma-transaction.repository";
import type { TransactionType } from "../repositories/transaction.repository";

export async function getTransactions(input: {
  userId: string;
  month?: string;
  type?: TransactionType;
}) {
  return prismaTransactionRepository.listByUser(input);
}
