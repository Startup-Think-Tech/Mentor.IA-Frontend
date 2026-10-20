import type { Metadata } from "next";
import { DiagnosticQuiz } from "@/components/diagnostic/diagnostic-quiz";

export const metadata: Metadata = {
  title: "Quiz diagnóstico | Mentor.ia",
  description: "Responda ao quiz e personalize seu cronograma de estudos.",
};

export default function QuizPage() {
  return <DiagnosticQuiz />;
}
