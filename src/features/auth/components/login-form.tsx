"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setIsPending(false);

    if (!result?.ok) {
      setError("Email atau password salah.");
      return;
    }

    window.location.href = result.url ?? "/dashboard";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
      {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p> : null}
      <div>
        <label className="text-sm font-medium text-[#000000]" htmlFor="email">
          Email
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000] outline-none ring-emerald-500 focus:ring-2"
          id="email"
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-[#000000]" htmlFor="password">
          Password
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000] outline-none ring-emerald-500 focus:ring-2"
          id="password"
          name="password"
          placeholder="••••••••"
          required
          type="password"
        />
      </div>
      <button className="w-full rounded-xl bg-[#53b6e0] px-4 py-3 font-semibold text-white hover:bg-[#3aa6d4] disabled:cursor-not-allowed disabled:bg-[#e5e5e5]" disabled={isPending} type="submit">
        {isPending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
