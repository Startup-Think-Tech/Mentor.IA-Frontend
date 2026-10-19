import type { Metadata } from "next";
import { ProgressDashboard } from "@/features/schedule/components/schedule-insights";
export const metadata: Metadata = { title: "Desempenho | Mentor.ia", description: "Acompanhe sua evolução nos estudos." };
export default function Page() { return <ProgressDashboard />; }
