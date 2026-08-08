"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaFamilyRepository } from "@/features/families/repositories/prisma-family.repository";
import { prismaAssetRepository } from "../repositories/prisma-asset.repository";
import { createAsset } from "../services/create-asset.service";
import type { AssetInput } from "../schemas/asset.schema";

function inputFromFormData(formData: FormData): AssetInput {
  return {
    familyId: String(formData.get("familyId") || "") || undefined,
    name: String(formData.get("name") ?? ""),
    symbol: String(formData.get("symbol") || "") || undefined,
    type: String(formData.get("type") || "OTHER"),
    valuationMode: String(formData.get("valuationMode") || "MANUAL_VALUE"),
    quantity: String(formData.get("quantity") || "") || undefined,
    currentPrice: String(formData.get("currentPrice") || "") || undefined,
    costBasis: String(formData.get("costBasis") || "0"),
    currentValue: String(formData.get("currentValue") || "") || undefined,
    platform: String(formData.get("platform") || "") || undefined,
    notes: String(formData.get("notes") || "") || undefined,
  } as AssetInput;
}

export async function createAssetAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const result = await createAsset(inputFromFormData(formData), { userId: session.user.id, assetRepository: prismaAssetRepository, familyRepository: prismaFamilyRepository });
  if (result.ok === false) redirect(`/assets?error=${encodeURIComponent(result.error)}`);
  revalidatePath("/assets");
  redirect("/assets?created=1");
}
