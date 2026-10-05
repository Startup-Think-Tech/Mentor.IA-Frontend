"use client";

import type { InputHTMLAttributes } from "react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type AuthTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function AuthTextField({ label, error, id, ...props }: AuthTextFieldProps) {
  return (
    <Field className="gap-2" data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id} className="text-sm font-semibold text-[#22305b]">
        {label}
      </FieldLabel>
      <Input
        id={id}
        aria-invalid={Boolean(error)}
        className="h-14 rounded-[28px] border-[#dce2f4] bg-[#eef1fa] px-5 text-base text-[#22305b] placeholder:text-[#7180af] focus-visible:border-[#3555b6] focus-visible:ring-[#3555b6]/20"
        {...props}
      />
      <FieldError errors={error ? [{ message: error }] : []} />
    </Field>
  );
}
