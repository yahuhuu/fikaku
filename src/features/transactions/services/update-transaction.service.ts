import { transactionSchema, type TransactionInput } from "../schemas/transaction.schema";
import type { TransactionListItem, TransactionRepository } from "../repositories/transaction.repository";

type Dependencies = { userId: string; transactionRepository: TransactionRepository };
type Result = { ok: true; data: TransactionListItem } | { ok: false; error: string };

export async function updateTransaction(
  id: string,
  input: TransactionInput,
  dependencies: Dependencies,
): Promise<Result> {
  if (!id) return { ok: false, error: "Transaction id is required" };

  const parsed = transactionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid transaction" };

  const transaction = await dependencies.transactionRepository.updateByUser(id, dependencies.userId, {
    type: parsed.data.type,
    amount: parsed.data.amount,
    description: parsed.data.description,
    date: parsed.data.date,
    categoryId: parsed.data.categoryId,
    walletId: parsed.data.walletId,
  });

  if (!transaction) return { ok: false, error: "Transaction not found" };
  return { ok: true, data: transaction };
}
