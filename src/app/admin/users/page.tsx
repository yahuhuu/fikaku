import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminPage } from "@/features/admin/components/admin-page";
import { DashboardShell } from "@/shared/components/layout/dashboard-shell";
import { authOptions } from "@/shared/lib/auth";

type PageProps = {
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <DashboardShell userRole={session.user.role}>
      <AdminPage searchParams={await searchParams} />
    </DashboardShell>
  );
}
