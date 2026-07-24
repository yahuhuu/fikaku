const transactions = [
  { id: "trx_1", date: "2026-07-01", description: "Gaji", type: "INCOME", amount: "Rp8.500.000" },
  { id: "trx_2", date: "2026-07-03", description: "Makan", type: "EXPENSE", amount: "Rp125.000" },
];

export function TransactionsPage() {
  return (
    <main className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Transactions</h1>
          <p className="mt-2 text-slate-600">CRUD transaksi akan hidup di feature ini.</p>
        </div>
        <button className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white">Tambah transaksi</button>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr><th className="p-4">Tanggal</th><th>Deskripsi</th><th>Tipe</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr className="border-t border-slate-100" key={transaction.id}>
                <td className="p-4">{transaction.date}</td><td>{transaction.description}</td><td>{transaction.type}</td><td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
