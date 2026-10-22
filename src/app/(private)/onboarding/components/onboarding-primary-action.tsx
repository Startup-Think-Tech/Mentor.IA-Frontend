import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { OnboardingPrimaryActionProps } from "@/app/(private)/onboarding/types/onboarding-component.types";

export function OnboardingPrimaryAction({
  href,
  label,
}: OnboardingPrimaryActionProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ size: "lg" }),
        "h-16 w-full rounded-[32px] bg-mentor-blue text-lg font-bold text-white hover:bg-mentor-blue-hover",
      )}
    >
      {label}
      <ArrowRight className="size-5" />
    </Link>
  );
}
