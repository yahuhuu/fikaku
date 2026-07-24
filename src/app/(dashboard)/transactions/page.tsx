import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { TransactionsPage } from "@/features/transactions/components/transactions-page";
import { authOptions } from "@/shared/lib/auth";

type PageProps = {
  searchParams: Promise<{
    month?: string;
    type?: string;
    created?: string;
    error?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <TransactionsPage userId={session.user.id} searchParams={await searchParams} />;
}
