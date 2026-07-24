import { describe, expect, it } from "vitest";
import { buildDashboardInsights } from "./build-dashboard-insights.service";

describe("buildDashboardInsights", () => {
  it("builds monthly report data and keeps the newest recent transactions", () => {
    const insights = buildDashboardInsights([
      { id: "trx_1", userId: "user_1", type: "EXPENSE", amount: 50_000, description: "Coffee", date: new Date("2026-07-03"), categoryId: "cat_1", walletId: "wallet_1", categoryName: "Food", walletName: "Cash" },
      { id: "trx_2", userId: "user_1", type: "INCOME", amount: 2_000_000, description: "Salary", date: new Date("2026-07-01"), categoryId: "cat_2", walletId: "wallet_1", categoryName: "Salary", walletName: "Cash" },
      { id: "trx_3", userId: "user_1", type: "EXPENSE", amount: 100_000, description: "Lunch", date: new Date("2026-07-04"), categoryId: "cat_1", walletId: "wallet_1", categoryName: "Food", walletName: "Cash" },
    ]);

    expect(insights.summary.netBalance).toBe(1_850_000);
    expect(insights.expenseByCategory).toEqual([
      { categoryName: "Food", amount: 150_000, percentage: 100 },
    ]);
    expect(insights.recentTransactions.map((transaction) => transaction.id)).toEqual([
      "trx_3",
      "trx_1",
      "trx_2",
    ]);
  });
});
