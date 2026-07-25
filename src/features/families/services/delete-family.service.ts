import type { FamilyRepository } from "../repositories/family.repository";

type Input = { familyId: string };
type Dependencies = { userId: string; familyRepository: FamilyRepository };
type Result = { ok: true } | { ok: false; error: string };

export async function deleteFamily(input: Input, dependencies: Dependencies): Promise<Result> {
  const familyId = input.familyId.trim();
  if (!familyId) return { ok: false, error: "Family is required" };

  const deleted = await dependencies.familyRepository.deleteByOwner({ familyId, userId: dependencies.userId });
  if (!deleted) return { ok: false, error: "Only family owner can delete family" };

  return { ok: true };
}
