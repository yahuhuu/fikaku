import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SettingsPage } from "@/features/settings/components/settings-page";
import { authOptions } from "@/shared/lib/auth";

type PageProps = { searchParams: Promise<{ updated?: string; error?: string; passwordUpdated?: string; passwordError?: string }> };

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return <SettingsPage userId={session.user.id} searchParams={await searchParams} />;
}
