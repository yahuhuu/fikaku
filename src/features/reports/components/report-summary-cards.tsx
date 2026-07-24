import { formatCurrency } from "@/shared/utils/format-currency";
import type { MonthlyReport } from "../services/calculate-monthly-report.service";

type ReportSummaryCardsProps = {
  summary: MonthlyReport["summary"];
};

export function ReportSummaryCards({ summary }: ReportSummaryCardsProps) {
  const cards = [
    { label: "Total income", value: summary.totalIncome, className: "text-emerald-600" },
    { label: "Total expense", value: summary.totalExpense, className: "text-rose-600" },
    { label: "Net cashflow", value: summary.netBalance, className: "text-slate-950" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" key={card.label}>
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className={`mt-3 text-2xl font-black ${card.className}`}>{formatCurrency(card.value)}</p>
        </article>
      ))}
    </div>
  );
}
