import { Check } from "lucide-react";

import type { OnboardingOptionIndicatorProps } from "@/app/(private)/onboarding/types/onboarding-component.types";
import { cn } from "@/lib/utils";

export function OnboardingOptionIndicator({
  selected,
}: OnboardingOptionIndicatorProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
        selected
          ? "border-white bg-white text-mentor-blue"
          : "border-current text-transparent",
      )}
    >
      <Check className="size-3" strokeWidth={3} />
    </span>
  );
}
