import type { Metadata } from "next";

import { diagnosticQuestionsMock } from "@/mocks/diagnostic-questions";
import { QuizDiagnostico } from "./_components/QuizDiagnostico";

export const metadata: Metadata = {
  title: "Quiz Diagnóstico | Mentor.ia",
  description: "Avaliação diagnóstica inicial do Mentor.ia.",
};

export default function DiagnosticoPage() {
  return <QuizDiagnostico questions={diagnosticQuestionsMock} />;
}
