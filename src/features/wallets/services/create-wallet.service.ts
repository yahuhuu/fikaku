import { walletSchema, type WalletInput } from "../schemas/wallet.schema";
import type { WalletListItem, WalletRepository } from "../repositories/wallet.repository";

type CreateWalletDependencies = {
  userId: string;
  walletRepository: WalletRepository;
};

type CreateWalletResult =
  | { ok: true; data: WalletListItem }
  | { ok: false; error: string };

export async function createWallet(
  input: WalletInput,
  dependencies: CreateWalletDependencies,
): Promise<CreateWalletResult> {
  const parsed = walletSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid wallet" };
  }

  const wallet = await dependencies.walletRepository.create({
    userId: dependencies.userId,
    name: parsed.data.name,
    balance: parsed.data.balance,
    currency: parsed.data.currency,
  });

  return { ok: true, data: wallet };
}
