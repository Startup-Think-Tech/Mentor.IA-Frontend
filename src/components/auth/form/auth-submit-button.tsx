"use client";

import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

export function AuthSubmitButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      type="submit"
      className="h-14 w-full rounded-[28px] bg-[#3555b6] text-base font-bold text-white hover:bg-[#2e49a3]"
      {...props}
    />
  );
}
