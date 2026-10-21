import type { Metadata } from "next";

import { DiagnosticQuiz } from "@/app/(private)/diagnostico/components/diagnostic-quiz";

export const metadata: Metadata = {
  title: "Diagnóstico | Mentor.ia",
  description: "Quiz diagnóstico com questões do ENEM.",
};

export default function DiagnosticPage() {
  return <DiagnosticQuiz />;
}
