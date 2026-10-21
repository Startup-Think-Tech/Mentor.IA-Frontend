"use client";

import { Star } from "lucide-react";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { ScrollReveal } from "@/components/react-bits/scroll-reveal";

export function LandingTestimonials() {
  const testimonials = [
    {
      name: "Sofia Mendes",
      grade: "3º Ano do Ensino Médio · São Paulo",
      target: "Objetivo: Medicina / USP",
      quote:
        "Eu chegava em casa do colégio exausta e tentava estudar até meia-noite sem render nada. O Mentor.ia me obrigou a focar em blocos de 30 minutos e foi o que salvou minha nota de Matemática: subi 140 pontos no último simulado porque parei de errar bobeira.",
      rating: 5,
    },
    {
      name: "Gabriel Torres",
      grade: "2º Ano do Ensino Médio · Belo Horizonte",
      target: "Objetivo: Engenharia / UFMG",
      quote:
        "Meu calcanhar de Aquiles sempre foi Física. O quiz diagnóstico mostrou que meu problema não era a matéria toda, mas especificamente cinemática básica. Com o plano de gaps eu destravei o assunto antes mesmo de entrar no terceirão.",
      rating: 5,
    },
    {
      name: "Beatriz Lima",
      grade: "Terceirão · Recife",
      target: "Objetivo: Direito / UFPE",
      quote:
        "A repetição espaçada é o maior diferencial. Todo ano eu esquecia o que estudei no primeiro semestre. Com o calendário do Mentor.ia, as revisões aparecem exatamente no dia certo antes de apagar da memória. Dá uma paz de espírito gigante.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-20 sm:py-28 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#174fc9]">
              Resultados Reais
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Quem estuda com o Mentor.ia sente a diferença no primeiro mês
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Veja como estudantes de todo o Brasil trocaram o desespero por método
              e consistência diária.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.12}>
              <SpotlightCard
                spotlightColor="rgba(23, 79, 201, 0.07)"
                className="relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#f59e0b]">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-slate-700 font-medium">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <p className="text-sm font-black text-slate-900">{item.name}</p>
                  <p className="text-xs font-medium text-slate-500">{item.grade}</p>
                  <span className="mt-1.5 inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#174fc9]">
                    {item.target}
                  </span>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
