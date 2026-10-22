import type { Metadata } from "next";
import { ProgressDashboard } from "@/app/(private)/desempenho/components/progress-dashboard";
export const metadata: Metadata = { title: "Desempenho | Mentor.ia", description: "Acompanhe sua evolução nos estudos." };
export default function Page() { return <ProgressDashboard />; }
