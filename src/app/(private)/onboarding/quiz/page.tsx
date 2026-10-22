import type { Metadata } from "next";

import { QuizReadyStep } from "@/app/(private)/onboarding/components/quiz-ready-step";

export const metadata: Metadata = {
  title: "Preparação para o quiz | Mentor.ia",
  description: "Prepare-se para iniciar seu diagnóstico personalizado.",
};

export default function QuizReadyPage() {
  return <QuizReadyStep />;
}
