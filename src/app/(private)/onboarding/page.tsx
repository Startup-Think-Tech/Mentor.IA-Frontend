import type { Metadata } from "next";

import { WelcomeStep } from "@/app/(private)/onboarding/components/welcome-step";

export const metadata: Metadata = {
  title: "Onboarding | Mentor.ia",
  description: "Configure sua rotina de estudos no Mentor.ia.",
};

export default function OnboardingPage() {
  return <WelcomeStep />;
}
