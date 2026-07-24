import { registerAction } from "../actions/register.action";

export function RegisterForm() {
  return (
    <form action={registerAction} className="space-y-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
      <div>
        <label className="text-sm font-medium text-[#000000]" htmlFor="name">Nama</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000] outline-none ring-emerald-500 focus:ring-2" id="name" name="name" placeholder="Fiky" required />
      </div>
      <div>
        <label className="text-sm font-medium text-[#000000]" htmlFor="email">Email</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000] outline-none ring-emerald-500 focus:ring-2" id="email" name="email" placeholder="you@company.com" required type="email" />
      </div>
      <div>
        <label className="text-sm font-medium text-[#000000]" htmlFor="password">Password</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000] outline-none ring-emerald-500 focus:ring-2" id="password" minLength={8} name="password" placeholder="minimal 8 karakter" required type="password" />
      </div>
      <button className="w-full rounded-xl bg-[#53b6e0] px-4 py-3 font-semibold text-white hover:bg-[#3aa6d4]" type="submit">Buat akun</button>
    </form>
  );
}
