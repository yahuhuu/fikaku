import { describe, expect, it } from "vitest";
import { calculateDashboardSummary } from "./calculate-dashboard-summary.service";

describe("calculateDashboardSummary", () => {
  it("calculates income, expense, and net balance", () => {
    const summary = calculateDashboardSummary([
      { type: "INCOME", amount: 5_000_000 },
      { type: "EXPENSE", amount: 750_000 },
      { type: "EXPENSE", amount: 250_000 },
    ]);

    expect(summary.totalIncome).toBe(5_000_000);
    expect(summary.totalExpense).toBe(1_000_000);
    expect(summary.netBalance).toBe(4_000_000);
  });

  it("returns zero totals for an empty transaction list", () => {
    expect(calculateDashboardSummary([])).toEqual({
      totalIncome: 0,
      totalExpense: 0,
      netBalance: 0,
    });
  });
});
