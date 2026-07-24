"use client";

import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailyCashflow, ExpenseCategoryBreakdown } from "../services/calculate-monthly-report.service";

const COLORS = ["#53b6e0", "#facc15", "#fb923c", "#ec4899", "#a855f7"];

type ReportChartsProps = { expenseByCategory: ExpenseCategoryBreakdown[]; dailyCashflow: DailyCashflow[] };

export function ReportCharts({ expenseByCategory, dailyCashflow }: ReportChartsProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]">
        <h2 className="text-xl font-bold text-[#000000]">Category chart</h2>
        <div className="mt-4 h-72">
          {expenseByCategory.length === 0 ? <p className="pt-24 text-center text-[#94a3b8]">Belum ada data expense.</p> : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseByCategory} dataKey="amount" nameKey="categoryName" outerRadius={95} label>
                  {expenseByCategory.map((_, index) => <Cell fill={COLORS[index % COLORS.length]} key={index} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
      <section className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]">
        <h2 className="text-xl font-bold text-[#000000]">Daily cashflow chart</h2>
        <div className="mt-4 h-72">
          {dailyCashflow.length === 0 ? <p className="pt-24 text-center text-[#94a3b8]">Belum ada data cashflow.</p> : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyCashflow}>
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#53b6e0" strokeWidth={3} />
                <Line type="monotone" dataKey="expense" stroke="#ec4899" strokeWidth={3} />
                <Line type="monotone" dataKey="net" stroke="#facc15" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </div>
  );
}
