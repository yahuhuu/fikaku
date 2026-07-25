import type { FamilyRepository } from "../../families/repositories/family.repository";
import { transactionSchema, type TransactionInput } from "../schemas/transaction.schema";
import type { TransactionListItem, TransactionRepository } from "../repositories/transaction.repository";

type Dependencies = { userId: string; transactionRepository: TransactionRepository; familyRepository?: FamilyRepository };
type Result = { ok: true; data: TransactionListItem } | { ok: false; error: string };

export async function updateTransaction(
  id: string,
  input: TransactionInput,
  dependencies: Dependencies,
): Promise<Result> {
  if (!id) return { ok: false, error: "Transaction id is required" };

  const parsed = transactionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid transaction" };

  const existing = await dependencies.transactionRepository.findById(id);
  if (!existing) return { ok: false, error: "Transaction not found" };

  const data = {
    type: parsed.data.type,
    amount: parsed.data.amount,
    description: parsed.data.description,
    date: parsed.data.date,
    categoryId: parsed.data.categoryId,
    walletId: parsed.data.walletId,
    familyId: parsed.data.familyId,
  };

  if (existing.familyId) {
    const canEdit = dependencies.familyRepository ? await dependencies.familyRepository.canEditFamilyTransaction({ familyId: existing.familyId, userId: dependencies.userId }) : false;
    if (!canEdit) return { ok: false, error: "You are not allowed to edit this family transaction" };
    const transaction = await dependencies.transactionRepository.updateByFamilyMember(id, existing.familyId, {
      ...data,
      familyId: existing.familyId,
      editedById: dependencies.userId,
    });
    if (!transaction) return { ok: false, error: "Transaction not found" };
    return { ok: true, data: transaction };
  }

  const transaction = await dependencies.transactionRepository.updateByUser(id, dependencies.userId, data);

  if (!transaction) return { ok: false, error: "Transaction not found" };
  return { ok: true, data: transaction };
}
