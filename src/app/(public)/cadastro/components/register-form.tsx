"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "@/components/ui/field";
import {
  registerSchema,
  type RegisterInput,
} from "@/lib/auth/schemas/register.schema";
import { authService } from "@/services/auth.service";
import { AuthTextField } from "@/components/auth/form/auth-text-field";
import { AuthSubmitButton } from "@/components/auth/form/auth-submit-button";

export function RegisterForm() {
  const router = useRouter();
  const [serviceError, setServiceError] = useState<string | null>(null);
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
    mode: "onBlur",
  });

  async function onSubmit(values: RegisterInput) {
    setServiceError(null);

    try {
      await authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      router.push("/onboarding");
    } catch (error) {
      setServiceError(
        error instanceof Error
          ? error.message
          : "Nao foi possivel criar sua conta.",
      );
    }
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <AuthTextField
        id="name"
        label="Nome completo"
        autoComplete="name"
        placeholder="Seu nome completo"
        error={form.formState.errors.name?.message}
        {...form.register("name")}
      />

      <AuthTextField
        id="email"
        label="E-mail"
        type="email"
        autoComplete="email"
        placeholder="seu@email.com"
        error={form.formState.errors.email?.message}
        {...form.register("email")}
      />

      <AuthTextField
        id="password"
        label="Senha"
        type="password"
        autoComplete="new-password"
        placeholder="Crie uma senha segura"
        error={form.formState.errors.password?.message}
        {...form.register("password")}
      />

      <AuthTextField
        id="confirmPassword"
        label="Confirmar senha"
        type="password"
        autoComplete="new-password"
        placeholder="Confirme sua senha"
        error={form.formState.errors.confirmPassword?.message}
        {...form.register("confirmPassword")}
      />

      <Controller
        control={form.control}
        name="acceptedTerms"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="flex items-start gap-3 text-sm text-[#7180af]">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-0.5"
              />

              <span>
                Concordo com os{" "}
                <span className="font-medium text-[#3555b6]">Termos de Uso</span>
                {" "}e{" "}
                <span className="font-medium text-[#3555b6]">
                  Política de Privacidade
                </span>
              </span>
            </label>
            <FieldError
              errors={
                form.formState.errors.acceptedTerms
                  ? [{ message: form.formState.errors.acceptedTerms.message }]
                  : []
              }
            />
          </div>
        )}
      />

      {serviceError && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {serviceError}
        </p>
      )}

      <AuthSubmitButton disabled={form.formState.isSubmitting}>
        Criar minha conta
      </AuthSubmitButton>
    </form>
  );
}
