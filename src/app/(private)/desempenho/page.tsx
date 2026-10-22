import type { Metadata } from "next";
import { Dashboard } from "@/app/(private)/dashboard/components/dashboard";
export const metadata: Metadata = { title: "Desempenho | Mentor.ia", description: "Acompanhe sua evolução nos estudos." };
export default function Page() { return <Dashboard />; }
