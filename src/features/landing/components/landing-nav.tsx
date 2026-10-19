"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, GraduationCap } from "lucide-react";

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Simulador", href: "#simulador" },
    { label: "Método 30min", href: "#metodo" },
    { label: "Comparativo", href: "#comparativo" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs py-2"
          : "border-b border-slate-100 bg-white/80 backdrop-blur-xs py-3.5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo da Marca */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 0.4 }}
            className="flex size-10 items-center justify-center rounded-xl bg-[#174fc9] text-white shadow-xs"
          >
            <GraduationCap className="size-5 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-[#0f172a]">
              Mentor<span className="text-[#f59e0b]">.ia</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#174fc9]">
              Ensino Médio & ENEM
            </span>
          </div>
        </Link>

        {/* Links com Animated Pill Hover (React Bits Style) */}
        <nav
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative px-3.5 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-[#174fc9]"
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="absolute inset-0 rounded-lg bg-blue-50/80 -z-10"
                />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Botões de Ação com Micro-interações */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-[#174fc9]"
          >
            Já tenho conta
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/cadastro"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#174fc9] px-4.5 py-2.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#1542a6]"
            >
              <span>Diagnóstico Grátis</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Botão Mobile */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex size-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Menu Mobile com Animação Fluida */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-slate-200 bg-white px-4 py-4 md:hidden"
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#174fc9]"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Entrar na minha conta
                </Link>
                <Link
                  href="/cadastro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl bg-[#174fc9] py-3 text-sm font-bold text-white hover:bg-[#1542a6]"
                >
                  Fazer Diagnóstico Gratuito
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
