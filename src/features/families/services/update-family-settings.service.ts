import { updateFamilySettingsSchema, type UpdateFamilySettingsInput } from "../schemas/family.schema";
import type { FamilyListItem, FamilyRepository } from "../repositories/family.repository";

type Dependencies = { userId: string; familyRepository: FamilyRepository };
type Result = { ok: true; data: FamilyListItem } | { ok: false; error: string };

export async function updateFamilySettings(input: UpdateFamilySettingsInput, dependencies: Dependencies): Promise<Result> {
  const parsed = updateFamilySettingsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid family settings" };
  const family = await dependencies.familyRepository.updateSettings({
    familyId: parsed.data.familyId,
    userId: dependencies.userId,
    name: parsed.data.name,
    transactionMode: parsed.data.transactionMode,
  });
  if (!family) return { ok: false, error: "Only family owner can update settings" };
  return { ok: true, data: family };
}
