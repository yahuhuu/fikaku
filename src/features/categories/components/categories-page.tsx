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
        <h1 className="text-3xl font-bold text-slate-950">Categories</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Kelola kategori income/expense per user untuk memperjelas laporan keuangan.</p>
      </div>
      {searchParams?.created ? <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">Kategori berhasil ditambahkan.</p> : null}
      {searchParams?.error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{searchParams.error}</p> : null}
      <CategoryForm />
      <CategoriesTable categories={categories} />
    </main>
  );
}
