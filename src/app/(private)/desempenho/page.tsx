import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Desempenho | Mentor.ia", description: "Acompanhe sua evolução nos estudos." };

export default function Page() {
  redirect("/dashboard");
}
