import { formatCurrency } from "@/shared/utils/format-currency";
import type { ExpenseCategoryBreakdown } from "../services/calculate-monthly-report.service";

type CategoryBreakdownProps = {
  items: ExpenseCategoryBreakdown[];
};

export function CategoryBreakdown({ items }: CategoryBreakdownProps) {
  return (
    <section className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#000000]">Expense by category</h2>
          <p className="mt-1 text-sm text-[#94a3b8]">Breakdown pengeluaran berdasarkan kategori.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-[#e5e5e5] p-6 text-center text-[#94a3b8]">Belum ada expense pada bulan ini.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.categoryName}>
              <div className="flex justify-between gap-4 text-sm">
                <span className="font-semibold text-[#000000]">{item.categoryName}</span>
                <span className="text-[#94a3b8]">{formatCurrency(item.amount)} · {item.percentage}%</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#e5fbff]">
                <div className="h-full rounded-full bg-[#e5fbff]0" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
