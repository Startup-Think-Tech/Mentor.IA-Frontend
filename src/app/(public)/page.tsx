import type { Metadata } from "next";

import { LandingNav } from "@/app/(public)/components/landing-nav";
import { LandingHero } from "@/app/(public)/components/landing-hero";
import { LandingPainPoints } from "@/app/(public)/components/landing-pain-points";
import { LandingHowItWorks } from "@/app/(public)/components/landing-how-it-works";
import { LandingInteractiveSimulator } from "@/app/(public)/components/landing-interactive-simulator";
import { LandingAiShowcase } from "@/app/(public)/components/landing-ai-showcase";
import { LandingComparison } from "@/app/(public)/components/landing-comparison";
import { LandingTestimonials } from "@/app/(public)/components/landing-testimonials";
import { LandingFaq } from "@/app/(public)/components/landing-faq";
import { LandingCta } from "@/app/(public)/components/landing-cta";
import { LandingFooter } from "@/app/(public)/components/landing-footer";
import { BackToTop } from "@/app/(public)/components/back-to-top";

export const metadata: Metadata = {
  title: "Mentor.ia | Estudos Inteligentes para o Ensino Médio & ENEM",
  description:
    "Descubra seus pontos fracos reais com questões do ENEM e estude em blocos de 30 minutos diários com repetição espaçada e mentoria com IA.",
  keywords: [
    "ENEM",
    "Ensino Médio",
    "Cronograma de Estudos",
    "Repetição Espaçada",
    "Inteligência Artificial",
    "Simulado ENEM",
    "Gaps de Aprendizagem",
  ],
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-[#174fc9]">
      <LandingNav />
      <main className="flex-1">
        <LandingHero />
        <LandingPainPoints />
        <LandingHowItWorks />
        <LandingInteractiveSimulator />
        <LandingAiShowcase />
        <LandingComparison />
        <LandingTestimonials />
        <LandingFaq />
        <LandingCta />
      </main>
      <LandingFooter />
      <BackToTop />
    </div>
  );
}
