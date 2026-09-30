import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Mentor.ia",
  description: "Acesse sua conta do Mentor.ia.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f3f4f8] p-1.5 sm:p-6">
      <section className="flex min-h-[calc(100dvh-12px)] w-full max-w-[420px] flex-col rounded-[20px] bg-[#304eac] px-5 py-5 text-white sm:min-h-[640px] sm:max-w-[380px] sm:rounded-[28px] sm:px-7 sm:py-7 sm:shadow-2xl">
        <header>
          <h1 className="text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em]">
            Bem-vindo de volta!
          </h1>
          <p className="mt-1 text-xs text-white/90">
            Faça login para continuar sua jornada.
          </p>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Image
            src="/logo-mentoria.png"
            alt="Mentor.ia"
            width={144}
            height={125}
            priority
            className="h-auto w-36"
          />

          <p className="mt-1 text-[0.68rem] leading-snug text-white/90">
            Tecnologia que entende como
            <br />
            você aprende.
          </p>
        </div>

        <form className="space-y-4" aria-label="Formulário de login">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold">
              E-mail:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nome@exemplo.com"
              required
              className="h-11 w-full rounded-full border border-white/5 bg-[#7e91d0] px-4 text-sm text-white outline-none transition placeholder:text-white/85 focus:border-white/50 focus:ring-2 focus:ring-white/25"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="senha" className="block text-xs font-semibold">
              Senha:
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              className="h-11 w-full rounded-full border border-white/5 bg-[#7e91d0] px-4 text-sm text-white outline-none transition placeholder:text-white/85 focus:border-white/50 focus:ring-2 focus:ring-white/25"
            />
          </div>

          <button
            type="button"
            className="mt-3 h-11 w-full cursor-pointer rounded-full bg-[#7185c6] text-sm font-bold text-white transition hover:bg-[#8295d2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-[0.99]"
          >
            Entrar
          </button>
        </form>

        <footer className="mt-5 flex items-center justify-between gap-4 text-[0.68rem]">
          <Link
            href="/esqueceu-senha"
            className="underline underline-offset-2 transition hover:text-white/75"
          >
            Esqueceu a senha?
          </Link>

          <Link
            href="/cadastro"
            className="font-semibold underline underline-offset-2 transition hover:text-white/75"
          >
            Criar conta
          </Link>
        </footer>
      </section>
    </main>
  );
}
