import type { Metadata } from "next";

import { StudyTimeStep } from "@/app/(private)/onboarding/components/study-time-step";

export const metadata: Metadata = {
  title: "Tempo disponível | Mentor.ia",
  description: "Defina quanto tempo você tem disponível por dia.",
};

export default function StudyTimePage() {
  return <StudyTimeStep />;
}
