"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

type LoginFormProps = {
  registered?: boolean;
  callbackUrl?: string;
};

export function LoginForm({ registered, callbackUrl = "/dashboard" }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: String(formData.get("email") ?? "").trim().toLowerCase(),
      password: String(formData.get("password") ?? ""),
      redirect: false,
      callbackUrl,
    });

    setIsPending(false);

    if (!result?.ok) {
      setError("Email atau password salah. Cek kembali data login kamu.");
      return;
    }

    window.location.href = result.url ?? callbackUrl;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]">
      {registered ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Akun berhasil dibuat. Silakan login.</p> : null}
      {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p> : null}
      <div>
        <label className="text-sm font-medium text-[#000000]" htmlFor="email">Email</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000] outline-none ring-[#53b6e0] focus:ring-2" id="email" name="email" placeholder="you@company.com" required type="email" />
      </div>
      <div>
        <label className="text-sm font-medium text-[#000000]" htmlFor="password">Password</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000] outline-none ring-[#53b6e0] focus:ring-2" id="password" name="password" placeholder="••••••••" required type="password" />
      </div>
      <button className="w-full rounded-xl bg-[#53b6e0] px-4 py-3 font-semibold text-white hover:bg-[#3aa6d4] disabled:cursor-not-allowed disabled:bg-[#e5e5e5]" disabled={isPending} type="submit">
        {isPending ? "Memproses login..." : "Masuk ke dashboard"}
      </button>
      <div className="hidden space-y-2 border-t border-[#e5e5e5] pt-4 text-center text-sm text-[#94a3b8] md:block">
        <p>
          <Link className="font-semibold text-[#53b6e0] hover:underline" href="/forgot-password">Lupa password?</Link>
        </p>
        <p>
          Belum punya akun? <Link className="font-semibold text-[#53b6e0] hover:underline" href="/register">Daftar sekarang</Link>
        </p>
      </div>
    </form>
  );
}
