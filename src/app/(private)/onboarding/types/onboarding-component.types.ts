import type { ReactNode } from "react";

export type OnboardingProgressProps = {
  current: number;
  total: number;
};

export type WelcomeStepProps = {
  name: string;
};

export type OnboardingShellProps = {
  children: ReactNode;
  brandPanel?: ReactNode;
};

export type OnboardingPrimaryActionProps = {
  href: string;
  label: string;
};
