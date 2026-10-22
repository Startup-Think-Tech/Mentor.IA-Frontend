import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Diagnóstico | Mentor.ia",
  description: "Quiz diagnóstico com questões do ENEM.",
};

export default function DiagnosticPage() {
  redirect("/quiz");
}
