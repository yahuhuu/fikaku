import { hashPassword, verifyPassword } from "../../auth/services/password.service";
import { passwordSchema, type PasswordInput } from "../schemas/profile.schema";
import type { ProfileRepository } from "../repositories/profile.repository";

type Dependencies = { userId: string; profileRepository: ProfileRepository };
type Result = { ok: true } | { ok: false; error: string };

export async function changePassword(input: PasswordInput, dependencies: Dependencies): Promise<Result> {
  const parsed = passwordSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid password" };

  const currentHash = await dependencies.profileRepository.findPasswordHashByUserId(dependencies.userId);
  if (!currentHash) return { ok: false, error: "User not found" };

  const currentPasswordValid = await verifyPassword(parsed.data.currentPassword, currentHash);
  if (!currentPasswordValid) return { ok: false, error: "Current password is incorrect" };

  const newHash = await hashPassword(parsed.data.newPassword);
  await dependencies.profileRepository.updatePassword(dependencies.userId, newHash);

  return { ok: true };
}
