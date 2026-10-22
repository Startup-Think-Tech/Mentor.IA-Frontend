import type { Metadata } from "next";
import { GapsDashboard } from "@/app/(private)/gaps/components/gaps-dashboard";
export const metadata: Metadata = { title: "Gaps | Mentor.ia", description: "Matérias que precisam de reforço." };
export default function Page() { return <GapsDashboard />; }
