import { describe, expect, it } from "vitest";
import { transactionSchema } from "./transaction.schema";

describe("transactionSchema", () => {
  it("accepts a valid income transaction and coerces amount/date", () => {
    const parsed = transactionSchema.parse({
      type: "INCOME",
      amount: "1500000",
      categoryId: "cat_1",
      walletId: "wallet_1",
      description: "Gaji freelance",
      date: "2026-07-01",
    });

    expect(parsed.amount).toBe(1500000);
    expect(parsed.date).toBeInstanceOf(Date);
  });

  it("rejects zero or negative amounts", () => {
    expect(() =>
      transactionSchema.parse({
        type: "EXPENSE",
        amount: 0,
        date: "2026-07-01",
      }),
    ).toThrow();
  });
});
