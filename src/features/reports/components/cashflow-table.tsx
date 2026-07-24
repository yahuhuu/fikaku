import { formatCurrency } from "@/shared/utils/format-currency";
import type { DailyCashflow } from "../services/calculate-monthly-report.service";

type CashflowTableProps = {
  rows: DailyCashflow[];
};

export function CashflowTable({ rows }: CashflowTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-sm">
      <div className="border-b border-[#e5e5e5] p-6">
        <h2 className="text-xl font-bold text-[#000000]">Daily cashflow</h2>
        <p className="mt-1 text-sm text-[#94a3b8]">Income, expense, dan net per tanggal.</p>
      </div>
      {rows.length === 0 ? (
        <p className="p-8 text-center text-[#94a3b8]">Belum ada transaksi pada bulan ini.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-[#94a3b8]">
            <tr>
              <th className="p-4">Tanggal</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-[#e5e5e5]" key={row.date}>
                <td className="p-4 font-medium text-[#000000]">{row.date}</td>
                <td className="text-[#53b6e0]">{formatCurrency(row.income)}</td>
                <td className="text-rose-600">{formatCurrency(row.expense)}</td>
                <td className="font-semibold text-[#000000]">{formatCurrency(row.net)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
