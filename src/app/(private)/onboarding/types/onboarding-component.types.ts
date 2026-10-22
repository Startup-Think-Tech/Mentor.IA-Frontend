import type { ReactNode } from "react";

export type OnboardingProgressProps = {
  current: number;
  total: number;
};

export type OnboardingPrimaryActionProps = {
  href: string;
  label: string;
};

export type OnboardingPrimaryButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  trailingIcon?: ReactNode;
};

export type OnboardingStepActionsProps = {
  children: ReactNode;
  onBack: () => void;
};
