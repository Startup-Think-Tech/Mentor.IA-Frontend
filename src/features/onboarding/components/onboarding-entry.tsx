"use client";

import { useAuthSession } from "@/features/auth/context/auth-session.context";

import { OnboardingShell } from "./onboarding-shell";
import { WelcomeStep } from "./welcome-step";

export function OnboardingEntry() {
  const session = useAuthSession();
  const firstName = session.user.name.trim().split(/\s+/)[0];

  return (
    <OnboardingShell>
      <WelcomeStep name={firstName} />
    </OnboardingShell>
  );
}
