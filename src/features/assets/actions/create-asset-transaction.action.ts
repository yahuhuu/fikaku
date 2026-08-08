"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaFamilyRepository } from "@/features/families/repositories/prisma-family.repository";
import { prismaAssetRepository, prismaAssetTransactionRepository } from "../repositories/prisma-asset.repository";
import { createAssetTransaction } from "../services/create-asset-transaction.service";
import type { AssetTransactionInput } from "../schemas/asset-transaction.schema";

function inputFromFormData(formData: FormData): AssetTransactionInput {
  return {
    assetId: String(formData.get("assetId") ?? ""),
    type: String(formData.get("type") || "TOP_UP"),
    quantity: String(formData.get("quantity") || "") || undefined,
    price: String(formData.get("price") || "") || undefined,
    amount: String(formData.get("amount") || "0"),
    date: String(formData.get("date") || new Date().toISOString()),
    notes: String(formData.get("notes") || "") || undefined,
  } as AssetTransactionInput;
}

export async function createAssetTransactionAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const result = await createAssetTransaction(inputFromFormData(formData), {
    userId: session.user.id,
    assetRepository: prismaAssetRepository,
    assetTransactionRepository: prismaAssetTransactionRepository,
    familyRepository: prismaFamilyRepository,
  });

  if (result.ok === false) redirect(`/assets?error=${encodeURIComponent(result.error)}`);

  revalidatePath("/assets");
  redirect("/assets?transactionAdded=1");
}
