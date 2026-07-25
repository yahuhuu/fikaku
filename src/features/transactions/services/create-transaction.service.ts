import { resolveTransactionFamily } from "../../families/services/resolve-transaction-family.service";
import type { FamilyRepository } from "../../families/repositories/family.repository";
import { transactionSchema, type TransactionInput } from "../schemas/transaction.schema";
import type { TransactionListItem, TransactionRepository } from "../repositories/transaction.repository";

type CreateTransactionDependencies = {
  userId: string;
  transactionRepository: TransactionRepository;
  familyRepository?: FamilyRepository;
};

type CreateTransactionResult =
  | { ok: true; data: TransactionListItem }
  | { ok: false; error: string };

export async function createTransaction(
  input: TransactionInput,
  dependencies: CreateTransactionDependencies,
): Promise<CreateTransactionResult> {
  const parsed = transactionSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid transaction" };
  }

  const families = dependencies.familyRepository ? await dependencies.familyRepository.listForUser(dependencies.userId) : [];
  const familyResult = resolveTransactionFamily({ familyId: parsed.data.familyId, families });
  if (familyResult.ok === false) return { ok: false, error: familyResult.error };

  const transaction = await dependencies.transactionRepository.create({
    userId: dependencies.userId,
    type: parsed.data.type,
    amount: parsed.data.amount,
    description: parsed.data.description,
    date: parsed.data.date,
    categoryId: parsed.data.categoryId,
    walletId: parsed.data.walletId,
    familyId: familyResult.familyId,
  });

  return { ok: true, data: transaction };
}
