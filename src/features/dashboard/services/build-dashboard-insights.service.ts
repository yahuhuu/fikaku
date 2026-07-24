import { calculateMonthlyReport } from "../../reports/services/calculate-monthly-report.service";
import type { TransactionListItem } from "../../transactions/repositories/transaction.repository";

export function buildDashboardInsights(transactions: TransactionListItem[]) {
  const report = calculateMonthlyReport(transactions);
  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return {
    ...report,
    recentTransactions,
  };
}
