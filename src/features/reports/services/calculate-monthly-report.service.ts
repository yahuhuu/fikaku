import { calculateDashboardSummary } from "../../dashboard/services/calculate-dashboard-summary.service";

type ReportTransaction = {
  type: "INCOME" | "EXPENSE";
  amount: number;
  categoryName: string | null;
  date: Date;
};

export type ExpenseCategoryBreakdown = {
  categoryName: string;
  amount: number;
  percentage: number;
};

export type DailyCashflow = {
  date: string;
  income: number;
  expense: number;
  net: number;
};

export type MonthlyReport = {
  summary: ReturnType<typeof calculateDashboardSummary>;
  expenseByCategory: ExpenseCategoryBreakdown[];
  dailyCashflow: DailyCashflow[];
};

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function roundPercent(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculateMonthlyReport(transactions: ReportTransaction[]): MonthlyReport {
  const summary = calculateDashboardSummary(transactions);
  const expenseCategoryTotals = new Map<string, number>();
  const dailyTotals = new Map<string, DailyCashflow>();

  for (const transaction of transactions) {
    const dateKey = toDateKey(transaction.date);
    const daily = dailyTotals.get(dateKey) ?? {
      date: dateKey,
      income: 0,
      expense: 0,
      net: 0,
    };

    if (transaction.type === "INCOME") {
      daily.income += transaction.amount;
    } else {
      daily.expense += transaction.amount;
      const categoryName = transaction.categoryName ?? "Uncategorized";
      expenseCategoryTotals.set(
        categoryName,
        (expenseCategoryTotals.get(categoryName) ?? 0) + transaction.amount,
      );
    }

    daily.net = daily.income - daily.expense;
    dailyTotals.set(dateKey, daily);
  }

  const expenseByCategory = Array.from(expenseCategoryTotals.entries())
    .map(([categoryName, amount]) => ({
      categoryName,
      amount,
      percentage: summary.totalExpense > 0 ? roundPercent((amount / summary.totalExpense) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount || a.categoryName.localeCompare(b.categoryName));

  const dailyCashflow = Array.from(dailyTotals.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return {
    summary,
    expenseByCategory,
    dailyCashflow,
  };
}
