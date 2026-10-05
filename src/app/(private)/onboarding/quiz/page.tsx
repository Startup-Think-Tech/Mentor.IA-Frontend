import type { Metadata } from "next";

import { QuizReadyEntry } from "@/features/onboarding/components/quiz-ready-entry";

export const metadata: Metadata = {
  title: "Preparação para o quiz | Mentor.ia",
  description: "Prepare-se para iniciar seu diagnóstico personalizado.",
};

export default function QuizReadyPage() {
  return <QuizReadyEntry />;
}
