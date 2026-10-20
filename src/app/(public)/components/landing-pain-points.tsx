"use client";

import { Clock, Brain, RefreshCw, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { ScrollReveal } from "@/components/react-bits/scroll-reveal";

export function LandingPainPoints() {
  const painPoints = [
    {
      icon: Clock,
      tag: "O Mito das 6 Horas",
      title: "Tentativas de maratonas impossíveis",
      description:
        "Você passa a manhã inteira no colégio, tem tarefas e cansaço. Tentar cumprir cronogramas de 6 horas da internet só gera culpa e burnout na segunda semana.",
      highlight: "O Mentor.ia foca em blocos de 30 minutos altamente concentrados.",
      spotlight: "rgba(23, 79, 201, 0.08)",
    },
    {
      icon: Brain,
      tag: "A Zona de Conforto",
      title: "Estudar o que você já sabe",
      description:
        "É tentador passar a tarde fazendo resumos bonitos da matéria favorita. Mas na prova do ENEM, o que derruba sua média são os conteúdos que você costuma evitar.",
      highlight: "Nosso algoritmo identifica seus Gaps reais e prioriza exatamente onde estão seus pontos cegos.",
      spotlight: "rgba(245, 158, 11, 0.08)",
    },
    {
      icon: RefreshCw,
      tag: "A Curva do Esquecimento",
      title: "A ilusão do 'já entendi tudo'",
      description:
        "Você estuda um assunto em março, mas em outubro não lembra nem o nome das fórmulas. Sem repetição programada, o cérebro descarta até 70% do que você leu.",
      highlight: "Agendamento automático de revisões espaçadas em 1, 3, 7, 14 e 30 dias.",
      spotlight: "rgba(16, 185, 129, 0.08)",
    },
  ];

  return (
    <section id="metodo" className="bg-white py-20 sm:py-28 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#174fc9]">
              A Realidade do Ensino Médio
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Por que os métodos tradicionais de estudo não funcionam no colégio?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              A maioria dos alunos não reprova por falta de esforço, mas por usar
              métodos que ignoram a rotina real e o funcionamento da memória humana.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {painPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.tag} delay={index * 0.12}>
                <SpotlightCard
                  spotlightColor={item.spotlight}
                  className="group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-[#f8fafc] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#174fc9] shadow-xs border border-slate-100 transition-colors group-hover:bg-[#174fc9] group-hover:text-white">
                        <Icon className="size-6" />
                      </div>
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-bold text-rose-700">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-200/60 pt-4">
                    <div className="flex items-start gap-2 text-xs font-semibold text-[#174fc9]">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{item.highlight}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
