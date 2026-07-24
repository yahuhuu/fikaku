import { formatCurrency } from "@/shared/utils/format-currency";

type SummaryCardsProps = {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
};

export function SummaryCards({ totalIncome, totalExpense, netBalance }: SummaryCardsProps) {
  const cards = [
    { label: "Income bulan ini", value: totalIncome, tone: "text-emerald-600" },
    { label: "Expense bulan ini", value: totalExpense, tone: "text-rose-600" },
    { label: "Net balance", value: netBalance, tone: "text-slate-900" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" key={card.label}>
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className={`mt-3 text-2xl font-bold ${card.tone}`}>{formatCurrency(card.value)}</p>
        </div>
      ))}
    </div>
  );
}
