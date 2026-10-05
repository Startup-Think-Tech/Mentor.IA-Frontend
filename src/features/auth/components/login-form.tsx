"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { AuthSubmitButton } from "@/features/auth/components/form/auth-submit-button";
import { AuthTextField } from "@/features/auth/components/form/auth-text-field";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/login.schema";
import { authService } from "@/features/auth/services/auth.service";

export function LoginForm() {
  const router = useRouter();
  const [serviceError, setServiceError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  async function onSubmit(values: LoginInput) {
    setServiceError(null);

    try {
      await authService.login(values);
      router.push("/onboarding");
    } catch (error) {
      setServiceError(
        error instanceof Error ? error.message : "Não foi possível entrar.",
      );
    }
  }

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <AuthTextField
        id="email"
        label="E-mail:"
        type="email"
        autoComplete="email"
        placeholder="nome@exemplo.com"
        error={form.formState.errors.email?.message}
        {...form.register("email")}
      />

      <AuthTextField
        id="password"
        label="Senha:"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        error={form.formState.errors.password?.message}
        {...form.register("password")}
      />

      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-2 text-[#7180af]">
          <Checkbox />
          <span>Lembrar de mim</span>
        </label>
        <Link
          href="/esqueceu-senha"
          className="font-semibold text-[#3555b6] hover:underline"
        >
          Esqueceu a senha?
        </Link>
      </div>

      {serviceError && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {serviceError}
        </p>
      )}

      <AuthSubmitButton disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
      </AuthSubmitButton>
    </form>
  );
}
