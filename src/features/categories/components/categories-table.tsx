import { deleteCategoryAction } from "../actions/delete-category.action";
import type { CategoryListItem } from "../repositories/category.repository";

type CategoriesTableProps = {
  categories: CategoryListItem[];
};

export function CategoriesTable({ categories }: CategoriesTableProps) {
  if (categories.length === 0) {
    return <div className="rounded-2xl border border-dashed border-[#e5e5e5] bg-white p-10 text-center text-[#94a3b8]">Belum ada kategori.</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-white text-[#94a3b8]">
          <tr>
            <th className="p-4">Nama</th>
            <th>Tipe</th>
            <th>Warna</th>
            <th>Icon</th>
            <th className="pr-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr className="border-t border-[#e5e5e5]" key={category.id}>
              <td className="p-4 font-medium text-[#000000]">{category.name}</td>
              <td><span className={category.type === "INCOME" ? "text-[#53b6e0]" : "text-rose-600"}>{category.type}</span></td>
              <td><span className="inline-flex items-center gap-2 text-[#94a3b8]"><span className="h-4 w-4 rounded-full border border-[#e5e5e5]" style={{ backgroundColor: category.color ?? "#e2e8f0" }} />{category.color ?? "-"}</span></td>
              <td className="text-[#94a3b8]">{category.icon ?? "-"}</td>
              <td className="pr-4 text-right">
                <form action={deleteCategoryAction}>
                  <input name="id" type="hidden" value={category.id} />
                  <button className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50" type="submit">Hapus</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
