import { deleteCategoryAction } from "../actions/delete-category.action";
import { updateCategoryAction } from "../actions/update-category.action";
import type { CategoryListItem } from "../repositories/category.repository";
import { ConfirmSubmitButton } from "@/shared/components/forms/confirm-submit-button";

type CategoriesTableProps = { categories: CategoryListItem[] };

export function CategoriesTable({ categories }: CategoriesTableProps) {
  if (categories.length === 0) return <div className="rounded-2xl border border-dashed border-[#e5e5e5] bg-white p-10 text-center text-[#94a3b8]">Belum ada kategori.</div>;

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <details className="rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-[0_10px_30px_rgba(83,182,224,0.08)]" key={category.id}>
          <summary className="cursor-pointer list-none">
            <div className="grid gap-3 text-sm md:grid-cols-5 md:items-center">
              <span className="font-medium text-[#000000]">{category.name}</span>
              <span className={category.type === "INCOME" ? "text-[#53b6e0]" : "text-rose-600"}>{category.type}</span>
              <span className="inline-flex items-center gap-2 text-[#94a3b8]"><span className="h-4 w-4 rounded-full border border-[#e5e5e5]" style={{ backgroundColor: category.color ?? "#e5e5e5" }} />{category.color ?? "-"}</span>
              <span className="text-[#94a3b8]">{category.icon ?? "-"}</span>
              <span className="text-right text-[#94a3b8]">Klik untuk edit</span>
            </div>
          </summary>
          <div className="mt-4 border-t border-[#e5e5e5] pt-4">
            <form action={updateCategoryAction} className="grid gap-3 md:grid-cols-5">
              <input name="id" type="hidden" value={category.id} />
              <input className="rounded-xl border border-[#e5e5e5] px-3 py-2" defaultValue={category.name} name="name" required />
              <select className="rounded-xl border border-[#e5e5e5] px-3 py-2" defaultValue={category.type} name="type"><option value="EXPENSE">Expense</option><option value="INCOME">Income</option></select>
              <input className="h-[42px] rounded-xl border border-[#e5e5e5] px-2" defaultValue={category.color ?? "#53b6e0"} name="color" type="color" />
              <input className="rounded-xl border border-[#e5e5e5] px-3 py-2" defaultValue={category.icon ?? ""} name="icon" placeholder="icon" />
              <button className="rounded-xl bg-[#53b6e0] px-4 py-2 font-semibold text-white" type="submit">Simpan</button>
            </form>
            <form action={deleteCategoryAction} className="mt-3"><input name="id" type="hidden" value={category.id} /><ConfirmSubmitButton className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60" confirmMessage="Hapus kategori ini? Transaksi lama akan kehilangan label kategori.">Hapus kategori</ConfirmSubmitButton></form>
          </div>
        </details>
      ))}
    </div>
  );
}
