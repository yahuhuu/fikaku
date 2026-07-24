import { describe, expect, it } from "vitest";
import { createWallet } from "./create-wallet.service";
import type { WalletRepository } from "../repositories/wallet.repository";

function createRepository(): WalletRepository {
  return {
    async create(data) {
      return {
        id: "wallet_new",
        userId: data.userId,
        name: data.name,
        balance: data.balance,
        currency: data.currency,
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

describe("createWallet", () => {
  it("creates a wallet with coerced balance and uppercase currency", async () => {
    const result = await createWallet(
      {
        name: "BCA",
        balance: "2500000",
        currency: "idr",
      },
      {
        userId: "user_1",
        walletRepository: createRepository(),
      },
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.userId).toBe("user_1");
    expect(result.data.balance).toBe(2500000);
    expect(result.data.currency).toBe("IDR");
  });

  it("rejects an empty wallet name", async () => {
    const result = await createWallet(
      {
        name: "",
        balance: 0,
        currency: "IDR",
      },
      {
        userId: "user_1",
        walletRepository: createRepository(),
      },
    );

    expect(result.ok).toBe(false);
  });
});
