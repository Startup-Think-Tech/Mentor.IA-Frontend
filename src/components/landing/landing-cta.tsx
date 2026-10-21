"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/react-bits/scroll-reveal";

export function LandingCta() {
  return (
    <section className="bg-[#174fc9] py-20 sm:py-24 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-[#ffd55a]">
            <GraduationCap className="size-4" />
            <span>Comece hoje a transformar seus estudos</span>
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl lg:leading-tight">
            Pare de acumular matérias. <br className="hidden sm:inline" />
            Descubra seus pontos fracos agora em 5 minutos.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base text-blue-100 sm:text-lg leading-relaxed">
            Junte-se aos estudantes que trocaram a ansiedade por consistência
            real com blocos curtos de 30 minutos e mentoria inteligente.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/cadastro"
                className="flex h-13 w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-white px-8 text-base font-bold text-[#174fc9] shadow-md transition-colors hover:bg-[#ffd55a] hover:text-slate-900"
              >
                <Sparkles className="size-5 text-[#f59e0b]" />
                <span>Fazer meu Diagnóstico Grátis</span>
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/login"
                className="flex h-13 w-full sm:w-auto items-center justify-center rounded-xl border border-white/40 bg-transparent px-7 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                Acessar minha conta
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-blue-100">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-[#ffd55a]" />
              100% Gratuito para alunos
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-[#ffd55a]" />
              Sem cartão de crédito
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-[#ffd55a]" />
              Acesso no celular e PC
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
