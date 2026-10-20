import type { Metadata } from "next";
import { GapsDashboard } from "@/app/(private)/_shared/schedule/components/schedule-insights";
export const metadata: Metadata = { title: "Gaps | Mentor.ia", description: "Matérias que precisam de reforço." };
export default function Page() { return <GapsDashboard />; }
