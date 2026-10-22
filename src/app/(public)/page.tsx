import type { Metadata } from "next";

import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingPainPoints } from "@/components/landing/landing-pain-points";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingInteractiveSimulator } from "@/components/landing/landing-interactive-simulator";
import { LandingAiShowcase } from "@/components/landing/landing-ai-showcase";
import { LandingComparison } from "@/components/landing/landing-comparison";
import { LandingTestimonials } from "@/components/landing/landing-testimonials";
import { LandingFaq } from "@/components/landing/landing-faq";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingFooter } from "@/components/landing/landing-footer";
import { BackToTop } from "@/components/landing/back-to-top";

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
    <div className="flex min-h-screen flex-col bg-white text-slate-900 selection:bg-mentor-blue-pale selection:text-mentor-blue">
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
