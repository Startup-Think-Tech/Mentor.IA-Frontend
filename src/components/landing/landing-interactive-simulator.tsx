"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { ScrollReveal } from "@/components/react-bits/scroll-reveal";

type Grade = "1ano" | "2ano" | "3ano";
type SubjectKey = "matematica" | "fisica" | "quimica" | "biologia" | "linguagens" | "redacao";
type DailyTime = 30 | 45 | 60 | 90;

const subjectData: Record<
  SubjectKey,
  {
    name: string;
    topics: string;
    gapScore: number;
    urgency: "CRÍTICA" | "ALTA" | "MÉDIA";
    enemWeight: string;
    sampleInsight: (grade: string, time: number) => string;
  }
> = {
  matematica: {
    name: "Matemática",
    topics: "Função de 1º e 2º grau, Geometria Plana e Razão & Proporção",
    gapScore: 82,
    urgency: "CRÍTICA",
    enemWeight: "Peso altíssimo no TRI (notas passam de 900+)",
    sampleInsight: (grade, time) =>
      `Para o seu momento no ${grade}, não tente resolver provas inteiras de uma vez. Hoje, separe ${time} minutos para dominar apenas 4 questões de Razão e Proporção. É a habilidade com maior retorno de nota no ENEM.`,
  },
  fisica: {
    name: "Física",
    topics: "Cinemática, Dinâmica (Leis de Newton) e Termologia",
    gapScore: 78,
    urgency: "ALTA",
    enemWeight: "Gargalo da maioria dos concorrentes de Ensino Médio",
    sampleInsight: (grade, time) =>
      `A maioria erra Física por não interpretar os dados do enunciado. Nos seus ${time} minutos de hoje, faça 3 exercícios desenhando o esquema das forças antes de calcular. Isso destrava seu raciocínio.`,
  },
  quimica: {
    name: "Química",
    topics: "Estequiometria, Funções Orgânicas e Soluções",
    gapScore: 75,
    urgency: "ALTA",
    enemWeight: "Questões recorrentes todo ano no primeiro e segundo dia",
    sampleInsight: (grade, time) =>
      `Estequiometria é 80% regra de três com massas molares. Use ${time} minutos hoje para calcular a massa molar de 5 substâncias cotidianas e resolver 2 questões anteriores. Pequena consistência vence o desespero.`,
  },
  biologia: {
    name: "Biologia",
    topics: "Ecologia, Citologia e Genética Básica",
    gapScore: 68,
    urgency: "MÉDIA",
    enemWeight: "Ecologia é o conteúdo mais cobrado de toda a história do ENEM",
    sampleInsight: (grade, time) =>
      `Biologia exige fixação visual. Nos ${time} minutos de hoje, revise as relações ecológicas e faça um mapa mental de cadeia trófica. O Mentor.ia já agendou sua revisão desse tema para daqui a 3 dias.`,
  },
  linguagens: {
    name: "Linguagens",
    topics: "Interpretação Textual, Figuras de Linguagem e Gêneros Digitais",
    gapScore: 64,
    urgency: "MÉDIA",
    enemWeight: "Fundamental para não cansar a leitura no 1º dia de prova",
    sampleInsight: (grade, time) =>
      `No ENEM, Linguagens mede velocidade de leitura e foco no comando da questão. Em ${time} minutos, resolva 3 textos longos marcando apenas o que a pergunta realmente exige. Evite releituras cansativas.`,
  },
  redacao: {
    name: "Redação",
    topics: "Estrutura Dissertativa, Repertório Sociocultural e Proposta de Intervenção",
    gapScore: 85,
    urgency: "CRÍTICA",
    enemWeight: "A única prova onde é possível garantir nota 1000 na pontuação",
    sampleInsight: (grade, time) =>
      `Não espere estar inspirado para escrever. Em ${time} minutos hoje, monte apenas o esqueleto da tese e os 5 elementos da proposta de intervenção para um tema social recente. O treino em partes traz segurança.`,
  },
};

const gradeLabels: Record<Grade, { label: string; badge: string }> = {
  "1ano": { label: "1º Ano do Ensino Médio", badge: "Construindo Base" },
  "2ano": { label: "2º Ano do Ensino Médio", badge: "Fase de Aceleração" },
  "3ano": { label: "3º Ano / Terceirão", badge: "Reta Final ENEM" },
};

export function LandingInteractiveSimulator() {
  const [selectedGrade, setSelectedGrade] = useState<Grade>("3ano");
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey>("matematica");
  const [selectedTime, setSelectedTime] = useState<DailyTime>(45);

  const activeSubject = subjectData[selectedSubject];
  const activeGrade = gradeLabels[selectedGrade];

  return (
    <section id="simulador" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-800">
              <Sparkles className="size-3.5 text-amber-600" />
              Simulador em Tempo Real
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Veja como o Mentor.ia organizaria sua semana agora
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Escolha sua série, a matéria que mais te tira o sono e o tempo que você realmente tem.
              Nosso simulador calcula a rotina perfeita para você.
            </p>
          </div>
        </ScrollReveal>

        {/* Container do Simulador */}
        <ScrollReveal delay={0.15}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-[#f8fafc] shadow-xl shadow-blue-900/5 lg:grid lg:grid-cols-12">
          {/* Lado Esquerdo: Controles do Usuário */}
          <div className="border-b border-slate-200 p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-b-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              1. Sua Série no Ensino Médio
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {(["1ano", "2ano", "3ano"] as Grade[]).map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => setSelectedGrade(grade)}
                  className={`flex items-center justify-between rounded-2xl border p-3.5 text-left text-sm font-bold transition-all ${
                    selectedGrade === grade
                      ? "border-[#174fc9] bg-blue-50/80 text-[#174fc9] shadow-xs"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span>{gradeLabels[grade].label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      selectedGrade === grade
                        ? "bg-[#174fc9] text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {gradeLabels[grade].badge}
                  </span>
                </button>
              ))}
            </div>

            <h3 className="mt-7 text-sm font-bold uppercase tracking-wider text-slate-500">
              2. Sua Maior Dificuldade (Vilã)
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
              {(
                [
                  "matematica",
                  "fisica",
                  "quimica",
                  "biologia",
                  "linguagens",
                  "redacao",
                ] as SubjectKey[]
              ).map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => setSelectedSubject(subject)}
                  className={`rounded-xl border p-3 text-center text-xs font-bold transition-all ${
                    selectedSubject === subject
                      ? "border-[#174fc9] bg-[#174fc9] text-white shadow-xs"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {subjectData[subject].name}
                </button>
              ))}
            </div>

            <h3 className="mt-7 text-sm font-bold uppercase tracking-wider text-slate-500">
              3. Tempo Real Disponível por Dia
            </h3>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {([30, 45, 60, 90] as DailyTime[]).map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`flex flex-col items-center justify-center rounded-xl border py-2.5 text-center transition-all ${
                    selectedTime === time
                      ? "border-[#174fc9] bg-blue-50 text-[#174fc9] font-extrabold shadow-xs"
                      : "border-slate-200 bg-white text-slate-700 font-semibold hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm">{time} min</span>
                  <span className="text-[10px] text-slate-400">/dia</span>
                </button>
              ))}
            </div>

            <div className="mt-7 rounded-2xl bg-blue-50/70 p-4 border border-blue-100 text-xs text-slate-600">
              <p className="flex items-center gap-1.5 font-bold text-[#174fc9]">
                <Clock className="size-4" />
                Sem promessas falsas:
              </p>
              <p className="mt-1">
                Com <strong>{selectedTime} minutos por dia</strong>, nosso
                algoritmo prioriza fatias curtas de 25min (técnica pomodoro) com
                intervalos para seu cérebro não cansar.
              </p>
            </div>
          </div>

          {/* Lado Direito: Resultado Dinâmico da Simulação */}
          <div className="bg-white p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between">
            <motion.div
              key={`${selectedGrade}-${selectedSubject}-${selectedTime}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
            >
              {/* Header do Resultado */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Plano Personalizado Gerado
                  </span>
                  <h4 className="text-2xl font-black text-slate-900">
                    Estratégia para {activeSubject.name}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      activeSubject.urgency === "CRÍTICA"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    Gap Urgência: {activeSubject.urgency} ({activeSubject.gapScore}/100)
                  </span>
                </div>
              </div>

              {/* Tópicos com Maior Retorno */}
              <div className="mt-5 rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                <p className="text-xs font-bold text-slate-500 uppercase">
                  Assuntos de Maior Impacto no ENEM
                </p>
                <p className="mt-1 text-sm font-extrabold text-slate-800">
                  {activeSubject.topics}
                </p>
                <p className="mt-1.5 text-xs text-[#174fc9] font-medium">
                  💡 {activeSubject.enemWeight}
                </p>
              </div>

              {/* Mensagem do Mentor IA */}
              <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-xl bg-[#174fc9] text-white">
                    <Brain className="size-4 text-[#ffd55a]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#174fc9]">
                      Orientação do Mentor.ia IA
                    </span>
                    <span className="ml-2 text-[10px] text-slate-400">
                      (Exclusiva para seu perfil)
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 font-medium italic">
                  &ldquo;
                  {activeSubject.sampleInsight(
                    activeGrade.label,
                    selectedTime
                  )}
                  &rdquo;
                </p>
              </div>

              {/* Estrutura Semanal Calculada */}
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Distribuição da sua semana com {selectedTime} min/dia:
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[11px] font-bold text-slate-500">
                      Sessões Foco
                    </p>
                    <p className="text-lg font-black text-[#174fc9]">
                      4 blocos
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[11px] font-bold text-slate-500">
                      Revisões Espaçadas
                    </p>
                    <p className="text-lg font-black text-amber-600">
                      2 no ciclo
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[11px] font-bold text-slate-500">
                      Exercícios Focados
                    </p>
                    <p className="text-lg font-black text-emerald-600">
                      ~15 itens
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[11px] font-bold text-slate-500">
                      Descanso
                    </p>
                    <p className="text-lg font-black text-slate-700">
                      1 a 2 dias
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Final do Simulador */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-slate-700">
                  Gostou dessa distribuição?
                </p>
                <p className="text-xs text-slate-500">
                  Crie sua conta em 1 minuto e faça o teste diagnóstico real.
                </p>
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  href="/cadastro"
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#174fc9] px-6 py-3 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#1542a6]"
                >
                  <span>Ativar Meu Cronograma</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
