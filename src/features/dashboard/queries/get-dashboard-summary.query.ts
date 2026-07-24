import { calculateDashboardSummary } from "../services/calculate-dashboard-summary.service";
import { prismaTransactionRepository } from "@/features/transactions/repositories/prisma-transaction.repository";

export async function getDashboardSummary(input: { userId: string; month?: string }) {
  const transactions = await prismaTransactionRepository.listByUser({
    userId: input.userId,
    month: input.month,
  });

  return calculateDashboardSummary(transactions);
}
