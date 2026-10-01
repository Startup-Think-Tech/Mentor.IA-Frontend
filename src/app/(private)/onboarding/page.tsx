import type { Metadata } from "next";

import { OnboardingEntry } from "@/features/onboarding/components/onboarding-entry";

export const metadata: Metadata = {
  title: "Onboarding | Mentor.ia",
  description: "Configure sua rotina de estudos no Mentor.ia.",
};

export default function OnboardingPage() {
  return <OnboardingEntry />;
}
