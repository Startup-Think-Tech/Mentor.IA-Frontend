"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";

import { ZodForm } from "@/components/FormLayout/ZodForm";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/use-login";

import { BrandHero } from "./brand-hero";
import { loginSchema, type LoginValues } from "./schema";

export function LoginForm() {
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(values: LoginValues) {
    login.mutate(values);
  }

  return (
    <div className="relative flex-1 flex flex-col bg-gradient-to-b from-[#2550bf] via-[#214bb5] to-[#1c40a3] px-6 pt-10 pb-4 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 -left-20 w-64 h-64 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none"
      />

      <div className="relative z-10 flex-1 flex flex-col">
        <section className="text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Bem-vindo de volta !
          </h1>
          <p className="text-blue-200 text-sm font-normal mt-1 leading-relaxed">
            Faça login para continuar sua jornada.
          </p>
        </section>

        <div className="my-auto flex flex-col">
          <BrandHero />
        </div>

        <ZodForm
          onSubmit={handleSubmit}
          schema={loginSchema}
          className="w-full space-y-4"
        >
          {(form) => (
            <>
              <Field data-invalid={Boolean(form.formState.errors.email)}>
                <FieldLabel
                  htmlFor="email"
                  className="text-xs font-semibold text-white/90 pl-1"
                >
                  E-mail:
                </FieldLabel>
                <Input
                  {...form.register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nome@exemplo.com"
                  aria-invalid={form.formState.errors.email ? true : undefined}
                  className="h-12 px-4 rounded-xl bg-white/20 border border-white/25 text-white placeholder-blue-200/60 shadow-inner focus-visible:bg-white/25 focus-visible:border-white/50 aria-invalid:border-destructive"
                />
                <FieldError errors={[form.formState.errors.email]} />
              </Field>

              <Field data-invalid={Boolean(form.formState.errors.password)}>
                <FieldLabel
                  htmlFor="password"
                  className="text-xs font-semibold text-white/90 pl-1"
                >
                  Senha:
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...form.register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-invalid={form.formState.errors.password ? true : undefined}
                    className="h-12 px-4 pr-11 rounded-xl bg-white/20 border border-white/25 text-white placeholder-blue-200/60 shadow-inner focus-visible:bg-white/25 focus-visible:border-white/50 aria-invalid:border-destructive"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-blue-200/70 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <FieldError errors={[form.formState.errors.password]} />
              </Field>

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={login.isPending}
                  className="w-full h-12 bg-[#4268bd] hover:bg-[#4d75d1] active:bg-[#3b5fae] text-white font-semibold text-base rounded-xl shadow-md shadow-blue-900/40 border border-white/20 tracking-wide disabled:opacity-60"
                >
                  {login.isPending ? (
                    <>
                      <Loader2Icon className="size-5 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </div>
            </>
          )}
        </ZodForm>

        <footer className="pt-6 pb-2 w-full flex items-center justify-between text-xs sm:text-sm font-medium">
          <Link
            href="/esqueceu-senha"
            className="text-blue-100 hover:text-white underline underline-offset-4 decoration-blue-300/60 transition-colors"
          >
            Esqueceu a senha?
          </Link>
          <Link
            href="/cadastro"
            className="text-white font-bold hover:underline underline-offset-4 transition-all"
          >
            Criar conta
          </Link>
        </footer>
      </div>
    </div>
  );
}