import { describe, expect, it } from "vitest";
import { calculateMonthlyReport } from "./calculate-monthly-report.service";

describe("calculateMonthlyReport", () => {
  it("summarizes totals and expense breakdown by category", () => {
    const report = calculateMonthlyReport([
      { type: "INCOME", amount: 5_000_000, categoryName: "Salary", date: new Date("2026-07-01") },
      { type: "EXPENSE", amount: 750_000, categoryName: "Food", date: new Date("2026-07-02") },
      { type: "EXPENSE", amount: 250_000, categoryName: "Food", date: new Date("2026-07-03") },
      { type: "EXPENSE", amount: 500_000, categoryName: "Transport", date: new Date("2026-07-04") },
    ]);

    expect(report.summary).toEqual({
      totalIncome: 5_000_000,
      totalExpense: 1_500_000,
      netBalance: 3_500_000,
    });
    expect(report.expenseByCategory).toEqual([
      { categoryName: "Food", amount: 1_000_000, percentage: 66.67 },
      { categoryName: "Transport", amount: 500_000, percentage: 33.33 },
    ]);
  });

  it("groups daily cashflow in chronological order", () => {
    const report = calculateMonthlyReport([
      { type: "EXPENSE", amount: 100_000, categoryName: "Food", date: new Date("2026-07-02") },
      { type: "INCOME", amount: 500_000, categoryName: "Salary", date: new Date("2026-07-01") },
      { type: "EXPENSE", amount: 50_000, categoryName: "Food", date: new Date("2026-07-02") },
    ]);

    expect(report.dailyCashflow).toEqual([
      { date: "2026-07-01", income: 500_000, expense: 0, net: 500_000 },
      { date: "2026-07-02", income: 0, expense: 150_000, net: -150_000 },
    ]);
  });
});
