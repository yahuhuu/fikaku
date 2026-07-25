"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaFamilyRepository } from "@/features/families/repositories/prisma-family.repository";
import { prismaTransactionRepository } from "../repositories/prisma-transaction.repository";

export async function deleteTransactionAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");

  if (id) {
    const transaction = await prismaTransactionRepository.findById(id);
    if (transaction?.familyId) {
      const canDelete = await prismaFamilyRepository.canDeleteFamilyTransaction({
        familyId: transaction.familyId,
        transactionOwnerId: transaction.userId,
        userId: session.user.id,
      });
      await prismaTransactionRepository.deleteByFamilyPermission(id, transaction.familyId, session.user.id, canDelete);
    } else {
      await prismaTransactionRepository.deleteByUser(id, session.user.id);
    }
  }

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  revalidatePath("/reports");
  redirect("/transactions?deleted=1");
}
