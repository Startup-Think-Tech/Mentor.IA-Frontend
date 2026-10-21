"use client";

import { Check, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/react-bits/scroll-reveal";

export function LandingComparison() {
  const comparisonRows = [
    {
      feature: "Tempo de estudo diário",
      traditional: "Metas irreais de 5 a 8 horas que você abandona na primeira semana",
      mentoria: "Blocos reais de 30 a 60 minutos adaptados aos seus dias livres",
    },
    {
      feature: "O que estudar no dia",
      traditional: "Você perde 30 minutos decidindo qual matéria abrir",
      mentoria: "A plataforma já entrega as sessões prontas baseadas no seu maior Gap",
    },
    {
      feature: "E se você perder um dia?",
      traditional: "O cronograma inteiro de PDF fura e vira uma bola de neve de culpa",
      mentoria: "O algoritmo recalcula os próximos blocos sem sobrecarga automática",
    },
    {
      feature: "Retenção da matéria (Esquecimento)",
      traditional: "Você esquece o assunto 15 dias depois e erra no simulado",
      mentoria: "Repetição espaçada inteligente programada nos dias 1, 3, 7, 14 e 30",
    },
    {
      feature: "Orientação e Feedback",
      traditional: "Nenhum feedback. Você só descobre que foi mal quando sai a nota",
      mentoria: "Insights contínuos com IA analisando seus acertos e fraquezas no ENEM",
    },
  ];

  return (
    <section id="comparativo" className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#174fc9]">
              Comparativo Direto
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Estudar no escuro vs. Estudar com o Mentor.ia
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              A diferença entre passar o ano ansioso com matéria acumulada e ter
              certeza de que está evoluindo a cada 30 minutos.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabela Comparativa Desktop e Cards Mobile */}
        <ScrollReveal delay={0.15}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-900/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-5 px-6 text-sm font-extrabold text-slate-700 w-1/3">
                      Critério
                    </th>
                    <th className="py-5 px-6 text-sm font-bold text-slate-400 w-1/3">
                      Jeito Tradicional / Sozinho
                    </th>
                    <th className="py-5 px-6 text-sm font-black text-[#174fc9] bg-blue-50/80 w-1/3">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="size-4 text-[#f59e0b]" />
                        Com o Mentor.ia
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-6 text-sm font-bold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-sm text-slate-500">
                        <div className="flex items-start gap-2">
                          <X className="size-4 shrink-0 text-rose-500 mt-0.5" />
                          <span>{row.traditional}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm font-semibold text-slate-900 bg-blue-50/40">
                        <div className="flex items-start gap-2">
                          <Check className="size-4 shrink-0 text-emerald-600 mt-0.5 font-bold" />
                          <span className="text-[#174fc9]">{row.mentoria}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 text-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#174fc9] px-7 py-3.5 text-sm font-bold text-white shadow-xs hover:bg-[#1542a6] transition-colors"
              >
                <span>Quero testar o método no meu dia a dia</span>
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
