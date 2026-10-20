import type { Metadata } from "next";
import { DiagnosticQuiz } from "@/app/(private)/_shared/diagnostic/components/diagnostic-quiz";

export const metadata: Metadata = {
  title: "Quiz diagnóstico | Mentor.ia",
  description: "Responda ao quiz e personalize seu cronograma de estudos.",
};

export default function QuizPage() {
  return <DiagnosticQuiz />;
}
