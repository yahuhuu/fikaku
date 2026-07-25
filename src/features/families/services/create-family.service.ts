import { createFamilySchema, type CreateFamilyInput } from "../schemas/family.schema";
import type { FamilyListItem, FamilyRepository } from "../repositories/family.repository";

type Dependencies = { userId: string; familyRepository: FamilyRepository };
type Result = { ok: true; data: FamilyListItem } | { ok: false; error: string };

export async function createFamily(input: CreateFamilyInput, dependencies: Dependencies): Promise<Result> {
  const parsed = createFamilySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid family" };

  const family = await dependencies.familyRepository.create({
    userId: dependencies.userId,
    name: parsed.data.name,
    transactionMode: parsed.data.transactionMode,
  });

  return { ok: true, data: family };
}
