import { prismaTransactionRepository } from "@/features/transactions/repositories/prisma-transaction.repository";
import { calculateMonthlyReport } from "../services/calculate-monthly-report.service";

export async function getMonthlyReport(input: { userId: string; month: string; familyId?: string }) {
  const transactions = input.familyId
    ? await prismaTransactionRepository.listByFamily({ familyId: input.familyId, month: input.month })
    : await prismaTransactionRepository.listByUser({ userId: input.userId, month: input.month });

  return calculateMonthlyReport(transactions);
}
