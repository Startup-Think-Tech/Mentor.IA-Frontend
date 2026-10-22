import { ArrowLeft } from "lucide-react";

import type { OnboardingStepActionsProps } from "@/app/(private)/onboarding/types/onboarding-component.types";
import { Button } from "@/components/ui/button";

export function OnboardingStepActions({
  children,
  onBack,
}: OnboardingStepActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      {children}
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="h-11 self-center px-5 text-base font-semibold text-mentor-blue hover:bg-mentor-blue-soft"
      >
        <ArrowLeft className="size-4" />
        Voltar
      </Button>
    </div>
  );
}
