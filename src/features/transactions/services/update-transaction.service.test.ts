import { describe, expect, it } from "vitest";
import { updateTransaction } from "./update-transaction.service";
import type { TransactionListItem, TransactionRepository } from "../repositories/transaction.repository";

function createTransaction(overrides: Partial<TransactionListItem> = {}): TransactionListItem {
  return {
    id: "trx_1",
    userId: "user_1",
    type: "EXPENSE",
    amount: 50000,
    description: null,
    date: new Date("2026-07-24"),
    categoryId: null,
    walletId: null,
    familyId: null,
    familyName: null,
    editedById: null,
    editedByName: null,
    editedAt: null,
    categoryName: null,
    walletName: null,
    ...overrides,
  };
}

function createRepository(existing: TransactionListItem = createTransaction()): TransactionRepository {
  return {
    async create() { throw new Error("not used"); },
    async listByUser() { return []; },
    async listByFamily() { return []; },
    async findById() { return existing; },
    async deleteByUser() { return true; },
    async deleteByFamilyPermission() { return true; },
    async updateByFamilyMember(id, familyId, data) {
      return createTransaction({ id, familyId, ...data, editedById: data.editedById ?? null, editedByName: "Editor", editedAt: new Date() });
    },
    async updateByUser(id, userId, data) {
      return createTransaction({
        id,
        userId,
        type: data.type,
        amount: data.amount,
        description: data.description ?? null,
        date: data.date,
        categoryId: data.categoryId ?? null,
        walletId: data.walletId ?? null,
        familyId: data.familyId ?? null,
      });
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
