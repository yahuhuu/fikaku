type SummaryTransaction = {
  type: "INCOME" | "EXPENSE";
  amount: number;
};

export type DashboardSummary = {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
};

export function calculateDashboardSummary(
  transactions: SummaryTransaction[],
): DashboardSummary {
  return transactions.reduce<DashboardSummary>(
    (summary, transaction) => {
      if (transaction.type === "INCOME") {
        summary.totalIncome += transaction.amount;
      } else {
        summary.totalExpense += transaction.amount;
      }

      summary.netBalance = summary.totalIncome - summary.totalExpense;
      return summary;
    },
    { totalIncome: 0, totalExpense: 0, netBalance: 0 },
  );
}
