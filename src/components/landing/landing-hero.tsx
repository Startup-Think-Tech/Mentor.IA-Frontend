"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Brain, Target } from "lucide-react";
import { SplitText } from "@/components/react-bits/split-text";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";

export function LandingHero() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge Institucional com Fade-in */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-[#174fc9]"
        >
          <span className="size-2 rounded-full bg-[#f59e0b] animate-pulse" />
          <span>Plataforma de estudos para o Ensino Médio & ENEM</span>
        </motion.div>

        {/* Headline Principal com Efeito SplitText (React Bits) */}
        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:leading-[1.15] mx-auto text-center flex justify-center">
          <SplitText
            text="Saiba exatamente o que estudar hoje para o ENEM."
            className="justify-center text-center max-w-3xl"
            delay={0.03}
          />
        </h1>

        {/* Subtítulo com Animação Suave */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-lg sm:text-xl text-slate-600 leading-relaxed font-normal"
        >
          Um plano de estudos inteligente que se adapta aos horários do seu colégio,
          encontra onde você mais perde pontos e organiza sua rotina em blocos curtos
          com repetição espaçada.
        </motion.p>

        {/* Ações Principais com Micro-interações nos Botões */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/cadastro"
              className="flex h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-[#174fc9] px-7 text-base font-bold text-white shadow-md shadow-blue-900/10 transition-colors hover:bg-[#1542a6]"
            >
              <Sparkles className="size-4 text-[#ffd55a]" />
              <span>Fazer Diagnóstico Gratuito</span>
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <a
              href="#simulador"
              className="flex h-13 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#174fc9]"
            >
              Simular minha rotina
            </a>
          </motion.div>
        </motion.div>

        {/* Benefícios Chave com SpotlightCard (React Bits) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-3 text-left"
        >
          <SpotlightCard
            spotlightColor="rgba(23, 79, 201, 0.08)"
            className="rounded-2xl border-slate-200 bg-[#f8fafc] p-4.5 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#174fc9]">
                <Target className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Diagnóstico Real</p>
                <p className="mt-0.5 text-xs text-slate-500">20 questões oficiais do ENEM para mapear seus gaps.</p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.08)"
            className="rounded-2xl border-slate-200 bg-[#f8fafc] p-4.5 hover:border-amber-200 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                <Clock className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Blocos de 30 min</p>
                <p className="mt-0.5 text-xs text-slate-500">Feito para caber entre suas aulas e tarefas do colégio.</p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.08)"
            className="rounded-2xl border-slate-200 bg-[#f8fafc] p-4.5 hover:border-emerald-200 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                <Brain className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Repetição Espaçada</p>
                <p className="mt-0.5 text-xs text-slate-500">Revisões agendadas no dia exato para não esquecer nada.</p>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Micro-prova de confiança */}
        <p className="mt-6 text-xs text-slate-500 font-medium">
          100% gratuito para estudantes · Não pede cartão de crédito · Funciona direto no celular
        </p>
      </div>
    </section>
  );
}
