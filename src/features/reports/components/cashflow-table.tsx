import { formatCurrency } from "@/shared/utils/format-currency";
import type { DailyCashflow } from "../services/calculate-monthly-report.service";

type CashflowTableProps = {
  rows: DailyCashflow[];
};

export function CashflowTable({ rows }: CashflowTableProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-xl font-bold text-slate-950">Daily cashflow</h2>
        <p className="mt-1 text-sm text-slate-500">Income, expense, dan net per tanggal.</p>
      </div>
      {rows.length === 0 ? (
        <p className="p-8 text-center text-slate-500">Belum ada transaksi pada bulan ini.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4">Tanggal</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-slate-100" key={row.date}>
                <td className="p-4 font-medium text-slate-900">{row.date}</td>
                <td className="text-emerald-600">{formatCurrency(row.income)}</td>
                <td className="text-rose-600">{formatCurrency(row.expense)}</td>
                <td className="font-semibold text-slate-900">{formatCurrency(row.net)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
