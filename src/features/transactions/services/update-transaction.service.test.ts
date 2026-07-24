import { describe, expect, it } from "vitest";
import { updateTransaction } from "./update-transaction.service";
import type { TransactionRepository } from "../repositories/transaction.repository";

function createRepository(): TransactionRepository {
  return {
    async create() { throw new Error("not used"); },
    async listByUser() { return []; },
    async deleteByUser() { return true; },
    async updateByUser(id, userId, data) {
      return {
        id,
        userId,
        type: data.type,
        amount: data.amount,
        description: data.description ?? null,
        date: data.date,
        categoryId: data.categoryId ?? null,
        walletId: data.walletId ?? null,
        categoryName: null,
        walletName: null,
      };
    },
  };
}

describe("updateTransaction", () => {
  it("updates a transaction for the current user", async () => {
    const result = await updateTransaction(
      "trx_1",
      { type: "INCOME", amount: "100000", date: "2026-07-24", description: "Bonus" },
      { userId: "user_1", transactionRepository: createRepository() },
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.amount).toBe(100000);
    expect(result.data.description).toBe("Bonus");
  });
});
