import { describe, expect, it } from "vitest";
import { createTransaction } from "./create-transaction.service";
import type { TransactionRepository } from "../repositories/transaction.repository";

function createRepository(): TransactionRepository {
  return {
    async create(data) {
      return {
        id: "trx_new",
        userId: data.userId,
        type: data.type,
        amount: data.amount,
        description: data.description ?? null,
        date: data.date,
        categoryId: data.categoryId ?? null,
        walletId: data.walletId ?? null,
        categoryName: "Food",
        walletName: "Cash",
      };
    },
    async listByUser() {
      return [];
    },
    async deleteByUser() {
      return true;
    },
  };
}

describe("createTransaction", () => {
  it("creates a transaction for the current user", async () => {
    const result = await createTransaction(
      {
        type: "EXPENSE",
        amount: "125000",
        categoryId: "cat_food",
        walletId: "wallet_cash",
        description: "Makan siang",
        date: "2026-07-24",
      },
      {
        userId: "user_1",
        transactionRepository: createRepository(),
      },
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.userId).toBe("user_1");
    expect(result.data.amount).toBe(125000);
    expect(result.data.description).toBe("Makan siang");
  });

  it("rejects invalid amount", async () => {
    const result = await createTransaction(
      {
        type: "EXPENSE",
        amount: 0,
        date: "2026-07-24",
      },
      {
        userId: "user_1",
        transactionRepository: createRepository(),
      },
    );

    expect(result.ok).toBe(false);
  });
});
