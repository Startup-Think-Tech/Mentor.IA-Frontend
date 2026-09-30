"use client";

import Link from "next/link";
import { ChevronLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

export function CadastroForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [password, setPassword] = useState("");

  const strength = useMemo(() => {
    if (!password) return 0;

    let score = 0;
    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

    return score;
  }, [password]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col sm:min-h-[710px]">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/login"
          aria-label="Voltar para o login"
          className="inline-flex size-8 items-center justify-center rounded-full text-[#42566f] transition hover:bg-slate-100"
        >
          <ChevronLeft className="size-6" strokeWidth={2} />
        </Link>

        <span className="rounded-full border border-[#e4e9f1] bg-[#f8fafc] px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] text-[#94a3b8]">
          Passo 02 de 02
        </span>
      </div>

      <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#e4e9f1] bg-white px-2.5 py-1 shadow-sm">
        <Sparkles className="size-3.5 text-[#f4c542]" fill="currentColor" />
        <span className="text-xs font-bold text-[#2450b8]">Mentor.ia</span>
      </div>

      <header className="mb-7">
        <h1 className="text-[1.45rem] font-extrabold tracking-[-0.035em] text-[#224394]">
          Crie sua conta!
        </h1>
        <p className="mt-1 text-[0.78rem] leading-5 text-[#60708a]">
          Comece a estudar de forma personalizada e inteligente com apoio de IA.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="nome" className="block text-[0.72rem] font-bold">
              Nome completo
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              autoComplete="name"
              placeholder="Seu nome completo"
              required
              className="h-12 w-full rounded-[18px] border border-[#e0e3e8] bg-[#f0f1f4] px-4 text-sm text-[#334155] outline-none transition placeholder:text-[#6c788b] focus:border-[#315bc6] focus:ring-2 focus:ring-[#315bc6]/15"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-[0.72rem] font-bold">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="exemplo@estudo.com"
              required
              className="h-12 w-full rounded-[18px] border border-[#e0e3e8] bg-[#f0f1f4] px-4 text-sm text-[#334155] outline-none transition placeholder:text-[#6c788b] focus:border-[#315bc6] focus:ring-2 focus:ring-[#315bc6]/15"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="meta" className="block text-[0.72rem] font-bold">
              Foco ou meta de estudo
            </label>
            <input
              id="meta"
              name="meta"
              type="text"
              placeholder="Ex: Medicina, ENEM ou Concursos"
              className="h-12 w-full rounded-[18px] border border-[#e0e3e8] bg-[#f0f1f4] px-4 text-sm text-[#334155] outline-none transition placeholder:text-[#6c788b] focus:border-[#315bc6] focus:ring-2 focus:ring-[#315bc6]/15"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="senha" className="block text-[0.72rem] font-bold">
              Senha
            </label>

            <div className="relative">
              <input
                id="senha"
                name="senha"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-[18px] border border-[#e0e3e8] bg-[#f0f1f4] px-4 pr-12 text-sm text-[#334155] outline-none transition placeholder:text-[#6c788b] focus:border-[#315bc6] focus:ring-2 focus:ring-[#315bc6]/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8aa0bd] transition hover:bg-white/70 hover:text-[#315bc6]"
              >
                {showPassword ? (
                  <EyeOff className="size-4.5" />
                ) : (
                  <Eye className="size-4.5" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              {[1, 2, 3].map((level) => (
                <span
                  key={level}
                  className={
                    "h-[3px] flex-1 rounded-full " +
                    (strength >= level ? "bg-emerald-500" : "bg-slate-200")
                  }
                />
              ))}
              <span className="ml-1 min-w-9 text-right text-[0.62rem] font-medium text-emerald-600">
                {strength === 0 ? "" : strength === 1 ? "Fraca" : strength === 2 ? "Boa" : "Segura"}
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="confirmarSenha" className="block text-[0.72rem] font-bold">
              Confirmar senha
            </label>
            <input
              id="confirmarSenha"
              name="confirmarSenha"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repita sua senha"
              minLength={6}
              required
              className="h-12 w-full rounded-[18px] border border-[#e0e3e8] bg-[#f0f1f4] px-4 text-sm text-[#334155] outline-none transition placeholder:text-[#6c788b] focus:border-[#315bc6] focus:ring-2 focus:ring-[#315bc6]/15"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-2.5 pt-0.5 text-[0.66rem] leading-[1.15] text-[#5f718b]">
            <input
              type="checkbox"
              name="termos"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded border-[#cbd5e1] accent-[#315bc6]"
            />
            <span>
              Concordo com os{" "}
              <a href="#" className="font-bold text-[#1854c7] underline">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a href="#" className="font-bold text-[#1854c7] underline">
                Política de Privacidade
              </a>{" "}
              do Mentor.ia.
            </span>
          </label>
        </div>

        <div className="mt-auto pt-6">
          <button
            type="submit"
            disabled={!acceptedTerms}
            className="h-12 w-full rounded-[17px] bg-[#315bc6] text-sm font-extrabold text-white shadow-[0_10px_18px_rgba(49,91,198,0.2)] transition hover:bg-[#284fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315bc6]/40 disabled:cursor-not-allowed disabled:opacity-55"
          >
            Criar conta
          </button>

          <p className="mt-4 text-center text-[0.68rem] text-[#667895]">
            Já possui uma conta?{" "}
            <Link href="/login" className="font-bold text-[#1854c7] underline">
              Fazer login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
