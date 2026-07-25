import type { FamilyListItem } from "../repositories/family.repository";

type Input = { familyId?: string; families: FamilyListItem[] };
type Result = { ok: true; familyId?: string } | { ok: false; error: string };

export function resolveTransactionFamily(input: Input): Result {
  const normalizedFamilyId = input.familyId?.trim() || undefined;
  if (input.families.length === 0) return { ok: true, familyId: undefined };

  const allowsPersonal = input.families.some((family) => family.transactionMode === "ALLOW_PERSONAL");

  if (!normalizedFamilyId && input.families.length === 1 && input.families[0]?.transactionMode === "AUTO_FAMILY") {
    return { ok: true, familyId: input.families[0].id };
  }

  if (!normalizedFamilyId || normalizedFamilyId === "personal") {
    if (allowsPersonal) return { ok: true, familyId: undefined };
    return { ok: false, error: "Personal transaction is not allowed for your family settings" };
  }

  const selectedFamily = input.families.find((family) => family.id === normalizedFamilyId);
  if (!selectedFamily) return { ok: false, error: "Selected family is not available" };

  return { ok: true, familyId: selectedFamily.id };
}
