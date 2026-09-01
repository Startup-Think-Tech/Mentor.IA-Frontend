"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  type DefaultValues,
  type FieldValues,
  type SubmitHandler,
  useForm,
  type UseFormReturn,
} from "react-hook-form";
import { type z } from "zod";

import { cn } from "@/lib/utils";

type ZodFormProps<TValues extends FieldValues> = Omit<
  React.ComponentProps<"form">,
  "children" | "onSubmit"
> & {
  schema: z.ZodType<TValues, TValues>;
  defaultValues?: DefaultValues<TValues>;
  onSubmit: SubmitHandler<TValues>;
  children: (form: UseFormReturn<TValues>) => React.ReactNode;
};

export function ZodForm<TValues extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  ...props
}: ZodFormProps<TValues>) {
  const form = useForm<TValues>({
    criteriaMode: "all",
    defaultValues,
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...form}>
      <form
        className={cn("space-y-4", className)}
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        {children(form)}
      </form>
    </FormProvider>
  );
}
