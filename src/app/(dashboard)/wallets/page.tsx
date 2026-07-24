import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { WalletsPage } from "@/features/wallets/components/wallets-page";
import { authOptions } from "@/shared/lib/auth";

type PageProps = {
  searchParams: Promise<{
    created?: string;
    deleted?: string;
    updated?: string;
    error?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <WalletsPage userId={session.user.id} searchParams={await searchParams} />;
}
