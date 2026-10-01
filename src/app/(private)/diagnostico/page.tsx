import type { Metadata } from "next";

import { DiagnosticQuiz } from "@/features/diagnostic/components/diagnostic-quiz";

export const metadata: Metadata = {
  title: "Diagnóstico | Mentor.ia",
  description: "Quiz diagnóstico com questões do ENEM.",
};

export default function DiagnosticPage() {
  return <DiagnosticQuiz />;
}
