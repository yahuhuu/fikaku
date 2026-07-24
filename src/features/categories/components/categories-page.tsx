import { CategoryForm } from "./category-form";
import { CategoriesTable } from "./categories-table";
import { getCategories } from "../queries/get-categories.query";

type CategoriesPageProps = {
  userId: string;
  searchParams?: {
    created?: string;
    error?: string;
  };
};

export async function CategoriesPage({ userId, searchParams }: CategoriesPageProps) {
  const categories = await getCategories(userId);

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#000000]">Categories</h1>
        <p className="mt-2 max-w-2xl text-[#94a3b8]">Kelola kategori income/expense per user untuk memperjelas laporan keuangan.</p>
      </div>
      {searchParams?.created ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Kategori berhasil ditambahkan.</p> : null}
      {searchParams?.error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{searchParams.error}</p> : null}
      <CategoryForm />
      <CategoriesTable categories={categories} />
    </main>
  );
}
