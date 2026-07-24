import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";

type LoginPageProps = {
  searchParams: Promise<{
    registered?: string;
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <section className="w-full max-w-md">
        <Link className="text-2xl font-black text-[#53b6e0]" href="/">fikaku</Link>
        <h1 className="mt-8 text-3xl font-bold text-[#000000]">Masuk ke akun</h1>
        <p className="mb-6 mt-2 text-[#94a3b8]">Kelola finance dashboard kamu.</p>
        <LoginForm registered={params.registered === "1"} callbackUrl={params.callbackUrl ?? "/dashboard"} />
      </section>
    </main>
  );
}
