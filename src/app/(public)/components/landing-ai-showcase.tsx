"use client";

import { useState } from "react";
import { Brain, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { ScrollReveal } from "@/components/react-bits/scroll-reveal";

export function LandingAiShowcase() {
  const [selectedExample, setSelectedExample] = useState<number>(0);

  const examples = [
    {
      student: "Lucas, 3º Ano · Foco em Medicina",
      situation: "Erros em Estequiometria e Termoquímica",
      insightText:
        "Seu aproveitamento geral em Ciências da Natureza foi de 72%, mas Estequiometria e Termoquímica derrubaram sua média para 45%. Para hoje, não tente reler a teoria inteira: resolva apenas 3 questões de cálculo de rendimento e pureza em 25 minutos. Dominar esse detalhe agora vai garantir acertos rápidos no segundo dia do ENEM.",
      focus: "Química (Natureza)",
      action: "Fazer 3 questões de rendimento e pureza hoje",
    },
    {
      student: "Camila, 2º Ano · Foco em Direito",
      situation: "Dificuldade em Geometria Espacial e Funções",
      insightText:
        "Você manteve excelente consistência em Humanas, mas Matemática Básica precisa de atenção imediata antes do 3º ano. Hoje, reserve 20 minutos para desenhar e calcular o volume de três prismas retos em exercícios simples. Começar pelo visual vai destravar seu raciocínio sem causar frustração.",
      focus: "Matemática",
      action: "Desenhar esquemas de prismas em 20 min",
    },
    {
      student: "Matheus, 1º Ano · Construindo Rotina",
      situation: "Primeiro simulado do Ensino Médio",
      insightText:
        "Parabéns por concluir seu diagnóstico de abertura. Como você está no 1º ano, sua prioridade agora é criar o hábito de sentar por 30 minutos sem celular. Hoje, estude os conceitos básicos de Ecologia que você errou e registre como foi sua concentração no painel. O segredo é não deixar a matéria virar uma bola de neve.",
      focus: "Biologia & Hábitos",
      action: "Revisar conceitos básicos de Ecologia",
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-20 sm:py-28 border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#174fc9]">
              <Brain className="size-3.5" />
              Mentoria de Verdade
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Uma Inteligência Artificial que não enrola você
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Chega de IAs genéricas que cospem redações gigantes com dicas vagas.
              O motor de IA do Mentor.ia é calibrado exclusivamente para o ENEM,
              com linguagem acolhedora, direta e sempre com uma ação prática para hoje.
            </p>
          </div>
        </ScrollReveal>

        {/* Comparação: IA Genérica vs Mentor.ia */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Lado Esquerdo: Outras IAs / Métodos */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <XCircle className="size-5" />
                <span>O que acontece no ChatGPT ou prompts genéricos:</span>
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-5 text-xs text-slate-500 leading-relaxed font-mono">
                <p className="line-clamp-6">
                  &ldquo;Para passar no vestibular você deve estudar com afinco.
                  A química é a ciência que estuda a matéria e suas transformações.
                  Primeiro, compreenda a teoria atômica de Dalton, Thomson,
                  Rutherford e Bohr. Depois revise estequiometria, equilíbrio
                  químico, termodinâmica, eletroquímica e química orgânica. Faça 100
                  exercícios todos os dias sem parar...&rdquo;
                </p>
              </div>
              <p className="mt-3 text-xs text-slate-500 italic">
                Resultado: Respostas longas que dão preguiça de ler e geram mais ansiedade.
              </p>
            </div>
          </ScrollReveal>

          {/* Lado Direito: Mentor.ia */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="h-full rounded-3xl border-2 border-[#174fc9] bg-blue-50/60 p-7 shadow-sm">
              <div className="flex items-center gap-2 text-[#174fc9] font-extrabold text-sm">
                <CheckCircle2 className="size-5 text-emerald-600" />
                <span>Como o Mentor.ia fala com você:</span>
              </div>
              <div className="mt-4 rounded-2xl bg-white p-5 shadow-xs border border-blue-100">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
                  <span className="font-bold text-[#174fc9]">
                    {examples[selectedExample].student}
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#174fc9]">
                    Foco: {examples[selectedExample].focus}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-slate-800 leading-relaxed">
                  &ldquo;{examples[selectedExample].insightText}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
                  <Sparkles className="size-4 text-emerald-600" />
                  <span>Ação sugerida: {examples[selectedExample].action}</span>
                </div>
              </div>

              {/* Alternar exemplos */}
              <div className="mt-5 flex items-center justify-center gap-2">
                {examples.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedExample(idx)}
                    className={`size-2.5 rounded-full transition-all ${
                      selectedExample === idx
                        ? "w-7 bg-[#174fc9]"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Ver exemplo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
