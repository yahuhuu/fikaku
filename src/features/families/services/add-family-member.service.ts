import { addFamilyMemberSchema, type AddFamilyMemberInput } from "../schemas/family.schema";
import type { AddFamilyMemberResult, FamilyRepository } from "../repositories/family.repository";

type Dependencies = { ownerId: string; familyRepository: FamilyRepository };

export async function addFamilyMember(input: AddFamilyMemberInput, dependencies: Dependencies): Promise<AddFamilyMemberResult> {
  const parsed = addFamilyMemberSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid member" };
  return dependencies.familyRepository.addMemberByEmail({
    familyId: parsed.data.familyId,
    ownerId: dependencies.ownerId,
    email: parsed.data.email.toLowerCase(),
  });
}
