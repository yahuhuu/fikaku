"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailyCashflow, ExpenseCategoryBreakdown } from "../../reports/services/calculate-monthly-report.service";

type DashboardChartsProps = {
  dailyCashflow: DailyCashflow[];
  expenseByCategory: ExpenseCategoryBreakdown[];
};

export function DashboardCharts({ dailyCashflow, expenseByCategory }: DashboardChartsProps) {
  return (
    <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-[0_10px_30px_rgba(83,182,224,0.12)] sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#000000]">Monthly cashflow</h2>
            <p className="mt-1 text-sm text-[#94a3b8]">Income, expense, dan net harian bulan ini.</p>
          </div>
        </div>
        <div className="mt-4 h-64 sm:mt-6 sm:h-72">
          {dailyCashflow.length === 0 ? (
            <p className="pt-24 text-center text-[#94a3b8]">Belum ada cashflow bulan ini.</p>
          ) : (
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart data={dailyCashflow}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#53b6e0" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#53b6e0" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} width={44} />
                <Tooltip />
                <Area dataKey="income" fill="url(#incomeGradient)" stroke="#53b6e0" strokeWidth={3} type="monotone" />
                <Area dataKey="expense" fill="url(#expenseGradient)" stroke="#ec4899" strokeWidth={3} type="monotone" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-[0_10px_30px_rgba(83,182,224,0.12)] sm:p-6">
        <h2 className="text-xl font-bold text-[#000000]">Top expense categories</h2>
        <p className="mt-1 text-sm text-[#94a3b8]">Kategori pengeluaran terbesar bulan ini.</p>
        <div className="mt-4 h-64 sm:mt-6 sm:h-72">
          {expenseByCategory.length === 0 ? (
            <p className="pt-24 text-center text-[#94a3b8]">Belum ada expense bulan ini.</p>
          ) : (
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={expenseByCategory.slice(0, 5)} layout="vertical">
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis tick={{ fontSize: 10 }} type="number" />
                <YAxis dataKey="categoryName" tick={{ fontSize: 10 }} type="category" width={76} />
                <Tooltip />
                <Bar dataKey="amount" fill="#53b6e0" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </div>
  );
}
