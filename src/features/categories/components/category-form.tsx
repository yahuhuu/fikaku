import { createCategoryAction } from "../actions/create-category.action";

export function CategoryForm() {
  return (
    <form action={createCategoryAction} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-5">
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="name">Nama kategori</label>
        <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900" id="name" name="name" placeholder="Groceries" required />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="type">Tipe</label>
        <select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900" defaultValue="EXPENSE" id="type" name="type">
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="color">Warna</label>
        <input className="mt-2 h-[50px] w-full rounded-xl border border-slate-200 px-3 py-2" defaultValue="#10b981" id="color" name="color" type="color" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="icon">Icon</label>
        <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900" id="icon" name="icon" placeholder="shopping-cart" />
      </div>
      <button className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 md:col-span-5" type="submit">Tambah kategori</button>
    </form>
  );
}
