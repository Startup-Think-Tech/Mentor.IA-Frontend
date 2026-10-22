import type { OnboardingPrimaryButtonProps } from "@/app/(private)/onboarding/types/onboarding-component.types";
import { Button } from "@/components/ui/button";

export function OnboardingPrimaryButton({
  label,
  onClick,
  disabled,
  trailingIcon,
}: OnboardingPrimaryButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-16 w-full rounded-[32px] bg-mentor-blue text-lg font-bold text-white hover:bg-mentor-blue-hover"
    >
      {label}
      {trailingIcon}
    </Button>
  );
}
