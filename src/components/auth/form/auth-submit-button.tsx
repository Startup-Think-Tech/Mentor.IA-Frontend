"use client";

import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

export function AuthSubmitButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      type="submit"
      className="h-14 w-full rounded-[28px] bg-mentor-blue text-base font-bold text-white hover:bg-mentor-blue-hover"
      {...props}
    />
  );
}
