import { profileSchema, type ProfileInput } from "../schemas/profile.schema";
import type { ProfileRepository, ProfileUser } from "../repositories/profile.repository";

type Dependencies = { userId: string; profileRepository: ProfileRepository };
type Result = { ok: true; data: ProfileUser } | { ok: false; error: string };

export async function updateProfile(input: ProfileInput, dependencies: Dependencies): Promise<Result> {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid profile" };

  const user = await dependencies.profileRepository.updateUser({
    userId: dependencies.userId,
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
  });

  return { ok: true, data: user };
}
