import type { Metadata } from "next";

import { Dashboard } from "./components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Mentor.ia",
  description: "Acompanhe sua evolução nos estudos.",
};

export default function Page() {
  return <Dashboard />;
}
