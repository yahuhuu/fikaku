import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { CategoriesPage } from "@/features/categories/components/categories-page";
import { authOptions } from "@/shared/lib/auth";

type PageProps = {
  searchParams: Promise<{
    created?: string;
    error?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <CategoriesPage userId={session.user.id} searchParams={await searchParams} />;
}
