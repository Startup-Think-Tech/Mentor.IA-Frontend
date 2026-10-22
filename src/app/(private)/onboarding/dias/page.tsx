import type { Metadata } from "next";

import { StudyDaysStep } from "@/app/(private)/onboarding/components/study-days-step";

export const metadata: Metadata = {
  title: "Dias disponiveis | Mentor.ia",
  description: "Escolha os dias em que voce consegue estudar.",
};

export default function StudyDaysPage() {
  return <StudyDaysStep />;
}
