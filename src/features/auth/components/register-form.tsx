"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "@/components/ui/field";
import { AuthSubmitButton } from "@/features/auth/components/form/auth-submit-button";
import { AuthTextField } from "@/features/auth/components/form/auth-text-field";
import {
  registerSchema,
  type RegisterInput,
} from "@/features/auth/schemas/register.schema";
import { authService } from "@/features/auth/services/auth.service";

export function RegisterForm() {
  const router = useRouter();
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

  function onSubmit(values: RegisterInput) {
    authService.registerMockUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    router.push("/login");
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

      <AuthSubmitButton disabled={form.formState.isSubmitting}>
        Criar minha conta
      </AuthSubmitButton>
    </form>
  );
}
