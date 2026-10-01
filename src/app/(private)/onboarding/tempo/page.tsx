import type { Metadata } from "next";

import { StudyTimeEntry } from "@/features/onboarding/components/study-time-entry";

export const metadata: Metadata = {
  title: "Tempo disponível | Mentor.ia",
  description: "Defina quanto tempo você tem disponível por dia.",
};

export default function StudyTimePage() {
  return <StudyTimeEntry />;
}
