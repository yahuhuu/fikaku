import { getVisibleAssetsData } from "@/features/assets/queries/get-assets.query";
import { prismaTransactionRepository } from "@/features/transactions/repositories/prisma-transaction.repository";
import { buildDashboardInsights } from "../services/build-dashboard-insights.service";

export async function getDashboardSummary(input: { userId: string; month?: string }) {
  const [transactions, assetData] = await Promise.all([
    prismaTransactionRepository.listByUser({
      userId: input.userId,
      month: input.month,
    }),
    getVisibleAssetsData(input.userId),
  ]);

  return { ...buildDashboardInsights(transactions), assets: assetData };
}
