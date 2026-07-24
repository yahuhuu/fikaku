import { prismaTransactionRepository } from "@/features/transactions/repositories/prisma-transaction.repository";
import { buildDashboardInsights } from "../services/build-dashboard-insights.service";

export async function getDashboardSummary(input: { userId: string; month?: string }) {
  const transactions = await prismaTransactionRepository.listByUser({
    userId: input.userId,
    month: input.month,
  });

  return buildDashboardInsights(transactions);
}
