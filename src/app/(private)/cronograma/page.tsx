import type { Metadata } from "next";

import { ScheduleDashboard } from "@/features/schedule/components/schedule-dashboard";

export const metadata: Metadata = {
  title: "Cronograma | Mentor.ia",
  description: "Plano de estudos personalizado do Mentor.ia.",
};

export default function SchedulePage() {
  return <ScheduleDashboard />;
}
