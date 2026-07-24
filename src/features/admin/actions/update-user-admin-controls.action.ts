"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { updateUserAdminControls } from "../services/update-user-admin-controls.service";
import { prismaAdminUserRepository } from "../repositories/prisma-admin-user.repository";

export async function updateUserAdminControlsAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const result = await updateUserAdminControls(
    {
      userId: String(formData.get("userId") ?? ""),
      role: String(formData.get("role") ?? "USER"),
      plan: String(formData.get("plan") ?? "FREE"),
      status: String(formData.get("status") ?? "ACTIVE"),
    },
    { adminUserRepository: prismaAdminUserRepository },
  );

  if (!result.ok) redirect(`/admin?error=${encodeURIComponent(result.error)}`);
  revalidatePath("/admin");
  revalidatePath("/admin/users");
  redirect("/admin?updated=1");
}
