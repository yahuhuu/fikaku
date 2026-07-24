import { formatCurrency } from "@/shared/utils/format-currency";

type SummaryCardsProps = {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
};

export function SummaryCards({ totalIncome, totalExpense, netBalance }: SummaryCardsProps) {
  const cards = [
    { label: "Income bulan ini", value: totalIncome, tone: "text-[#53b6e0]" },
    { label: "Expense bulan ini", value: totalExpense, tone: "text-rose-600" },
    { label: "Net balance", value: netBalance, tone: "text-[#000000]" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm" key={card.label}>
          <p className="text-sm text-[#94a3b8]">{card.label}</p>
          <p className={`mt-3 text-2xl font-bold ${card.tone}`}>{formatCurrency(card.value)}</p>
        </div>
      ))}
    </div>
  );
}
