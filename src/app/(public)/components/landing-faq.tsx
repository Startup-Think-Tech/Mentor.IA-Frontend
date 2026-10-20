"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ScrollReveal } from "@/components/react-bits/scroll-reveal";

type FaqCategory = "todos" | "metodologia" | "enem" | "rotina";

interface FaqItem {
  category: FaqCategory;
  question: string;
  answer: string;
}

export function LandingFaq() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("todos");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories: { key: FaqCategory; label: string }[] = [
    { key: "todos", label: "Todas as Dúvidas" },
    { key: "rotina", label: "Rotina & Horários" },
    { key: "enem", label: "ENEM & Simulado" },
    { key: "metodologia", label: "Método 30min & IA" },
  ];

  const faqs: FaqItem[] = [
    {
      category: "rotina",
      question: "Estou no 1º ou 2º ano, vale a pena usar agora ou espero o 3º?",
      answer:
        "Vale a pena começar o quanto antes! Se você identificar e tapar os gaps de Matemática Básica, Química e Física agora, não terá que correr atrás de 3 anos de matérias acumuladas no Terceirão. O método se adapta à sua série atual.",
    },
    {
      category: "enem",
      question: "As questões do diagnóstico são do ENEM de verdade?",
      answer:
        "Sim! Utilizamos questões oficiais do exame nacional (integradas diretamente à base pública enem.dev). Os textos, gráficos, alternativas e gabaritos são exatamente os mesmos aplicados nas provas reais do ENEM.",
    },
    {
      category: "rotina",
      question: "Tenho apenas 30 ou 45 minutos livres por dia. Vai funcionar para mim?",
      answer:
        "O Mentor.ia foi desenhado exatamente para quem estuda no colégio e tem rotina corrida. Blocos focados de 25 a 30 minutos com repetição espaçada retêm muito mais conhecimento do que maratonas cansativas de 4 horas sem método.",
    },
    {
      category: "rotina",
      question: "E se eu tiver semana de provas no colégio e não conseguir estudar?",
      answer:
        "Zero culpa e zero estresse. O algoritmo do Mentor.ia é adaptativo: basta indicar sua nova disponibilidade. O sistema reorganiza as revisões vencidas sem criar uma bola de neve inatingível de matérias.",
    },
    {
      category: "metodologia",
      question: "O que é 'Repetição Espaçada' e como ela me ajuda no ENEM?",
      answer:
        "A repetição espaçada é uma técnica científica que agenda revisões nos intervalos em que seu cérebro está prestes a esquecer o conteúdo (1, 3, 7, 14 e 30 dias). Isso transfere a matéria da memória de curto prazo para a memória permanente, evitando que você esqueça no dia da prova.",
    },
    {
      category: "metodologia",
      question: "Como funciona a mentoria com IA do Mentor.ia?",
      answer:
        "Nossa inteligência artificial não dá respostas genéricas de 10 páginas. Ela analisa onde você mais perdeu pontos nas questões do ENEM e gera um parágrafo acolhedor e direto, indicando uma ação prática de 20 a 30 minutos para você fazer no mesmo dia.",
    },
    {
      category: "rotina",
      question: "O Mentor.ia é gratuito para estudantes?",
      answer:
        "Sim! O cadastro, o teste diagnóstico com 20 questões do ENEM, o cronograma personalizado e os insights de IA são 100% gratuitos para os estudantes.",
    },
    {
      category: "enem",
      question: "Consigo usar pelo celular?",
      answer:
        "Com certeza! A plataforma foi projetada mobile-first. Você pode fazer o quiz, acompanhar suas sessões e ler as orientações do mentor diretamente pelo navegador do seu celular, no trajeto ou no recreio da escola.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) => activeCategory === "todos" || item.category === activeCategory
  );

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-[#174fc9]">
              <HelpCircle className="size-4" />
              <span>Tire Suas Dúvidas</span>
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Perguntas Frequentes
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
              Tudo o que você precisa saber sobre o método, o quiz diagnóstico e seu cronograma.
            </p>
          </div>
        </ScrollReveal>

        {/* Filtros em Pílulas Interativas (React Bits Style) */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.key);
                  setOpenIndex(null);
                }}
                className={`relative rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeCategory === cat.key
                    ? "bg-[#174fc9] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Lista de Acordeão com Animação Fluida (Framer Motion) */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={faq.question} delay={index * 0.06}>
                <motion.div
                  layout
                  transition={{ duration: 0.2 }}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen
                      ? "border-[#174fc9] bg-blue-50/30"
                      : "border-slate-200 bg-[#f8fafc] hover:border-slate-300"
                  }`}
                >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-xs border border-slate-200"
                  >
                    <ChevronDown className={`size-4 ${isOpen ? "text-[#174fc9]" : ""}`} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-slate-600 border-t border-slate-200/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
