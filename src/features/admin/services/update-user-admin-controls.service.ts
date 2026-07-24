import { adminUserControlsSchema } from "../schemas/admin-user.schema";
import type { AdminUserControls, AdminUserRepository } from "../repositories/admin-user.repository";

type Dependencies = { adminUserRepository: AdminUserRepository };
type Result = { ok: true; data: AdminUserControls } | { ok: false; error: string };

export async function updateUserAdminControls(input: unknown, dependencies: Dependencies): Promise<Result> {
  const parsed = adminUserControlsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid user controls" };

  const data = await dependencies.adminUserRepository.updateControls(parsed.data);
  return { ok: true, data };
}
