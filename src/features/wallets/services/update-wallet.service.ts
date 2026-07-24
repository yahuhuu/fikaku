import { walletSchema, type WalletInput } from "../schemas/wallet.schema";
import type { WalletListItem, WalletRepository } from "../repositories/wallet.repository";

type Dependencies = { userId: string; walletRepository: WalletRepository };
type Result = { ok: true; data: WalletListItem } | { ok: false; error: string };

export async function updateWallet(id: string, input: WalletInput, dependencies: Dependencies): Promise<Result> {
  if (!id) return { ok: false, error: "Wallet id is required" };
  const parsed = walletSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid wallet" };
  const wallet = await dependencies.walletRepository.updateByUser(id, dependencies.userId, parsed.data);
  if (!wallet) return { ok: false, error: "Wallet not found" };
  return { ok: true, data: wallet };
}
