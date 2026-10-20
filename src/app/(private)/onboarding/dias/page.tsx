import type { Metadata } from "next";

import { StudyDaysEntry } from "@/app/(private)/onboarding/components/study-days-entry";

export const metadata: Metadata = {
  title: "Dias disponiveis | Mentor.ia",
  description: "Escolha os dias em que voce consegue estudar.",
};

export default function StudyDaysPage() {
  return <StudyDaysEntry />;
}
