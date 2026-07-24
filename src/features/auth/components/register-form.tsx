import { registerAction } from "../actions/register.action";

export function RegisterForm() {
  return (
    <form action={registerAction} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="name">Nama</label>
        <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none ring-emerald-500 focus:ring-2" id="name" name="name" placeholder="Fiky" required />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
        <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none ring-emerald-500 focus:ring-2" id="email" name="email" placeholder="you@company.com" required type="email" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
        <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none ring-emerald-500 focus:ring-2" id="password" minLength={8} name="password" placeholder="minimal 8 karakter" required type="password" />
      </div>
      <button className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700" type="submit">Buat akun</button>
    </form>
  );
}
