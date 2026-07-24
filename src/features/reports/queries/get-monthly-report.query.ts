import { prismaTransactionRepository } from "@/features/transactions/repositories/prisma-transaction.repository";
import { calculateMonthlyReport } from "../services/calculate-monthly-report.service";

export async function getMonthlyReport(input: { userId: string; month: string }) {
  const transactions = await prismaTransactionRepository.listByUser({
    userId: input.userId,
    month: input.month,
  });

  return calculateMonthlyReport(transactions);
}
