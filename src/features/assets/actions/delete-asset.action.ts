"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaFamilyRepository } from "@/features/families/repositories/prisma-family.repository";
import { prismaAssetRepository } from "../repositories/prisma-asset.repository";
import { deleteAsset } from "../services/delete-asset.service";

export async function deleteAssetAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const result = await deleteAsset(String(formData.get("id") ?? ""), { userId: session.user.id, assetRepository: prismaAssetRepository, familyRepository: prismaFamilyRepository });
  if (result.ok === false) redirect(`/assets?error=${encodeURIComponent(result.error)}`);
  revalidatePath("/assets");
  redirect("/assets?deleted=1");
}
