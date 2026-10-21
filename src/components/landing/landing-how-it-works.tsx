"use client";

import { Clock, HelpCircle, Target, CalendarDays, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { ScrollReveal } from "@/components/react-bits/scroll-reveal";

export function LandingHowItWorks() {
  const steps = [
    {
      number: "01",
      badge: "Passo 1",
      title: "Informe seu tempo real",
      description:
        "Diga quais dias você pode estudar e quanto tempo tem (ex: 30 ou 60 minutos). Sem cronogramas surreais que ignoram suas aulas e provas do colégio.",
      icon: Clock,
      spotlight: "rgba(23, 79, 201, 0.08)",
    },
    {
      number: "02",
      badge: "Passo 2",
      title: "Faça o Diagnóstico ENEM",
      description:
        "Responda a 20 questões oficiais calibradas por área do conhecimento. O sistema avalia seus erros e acertos em tempo real.",
      icon: HelpCircle,
      spotlight: "rgba(99, 102, 241, 0.08)",
    },
    {
      number: "03",
      badge: "Passo 3",
      title: "Descubra seus Gaps",
      description:
        "Nosso motor matemático calcula sua pontuação de prioridade (Crítica, Alta ou Média). Você descobre exatamente onde está perdendo nota.",
      icon: Target,
      spotlight: "rgba(244, 63, 94, 0.08)",
    },
    {
      number: "04",
      badge: "Passo 4",
      title: "Estude no piloto guiado",
      description:
        "Receba seu cronograma diário com blocos de 30 minutos, revisões espaçadas automáticas e orientações práticas geradas pela nossa IA.",
      icon: CalendarDays,
      spotlight: "rgba(245, 158, 11, 0.08)",
    },
  ];

  return (
    <section id="como-funciona" className="bg-[#f8fafc] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#174fc9]">
              Método Comprovado
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Como o Mentor.ia organiza sua rotina em 4 passos simples
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Você não precisa perder horas organizando planilhas no Excel.
              A gente cuida do planejamento para você focar apenas em aprender.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={index * 0.1}>
                <SpotlightCard
                  spotlightColor={step.spotlight}
                  className="relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-900/5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-slate-200">
                        {step.number}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
                        {step.badge}
                      </span>
                    </div>

                    <div className="mt-5 flex size-12 items-center justify-center rounded-2xl bg-[#174fc9] text-white shadow-xs">
                      <Icon className="size-6" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 text-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-[#174fc9] px-7 py-3.5 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-[#1542a6]"
              >
                <Sparkles className="size-5 text-[#ffd55a]" />
                <span>Fazer meu diagnóstico inicial agora</span>
                <ArrowRight className="size-5" />
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
