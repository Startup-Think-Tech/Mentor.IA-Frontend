import Link from "next/link";
import { GraduationCap, Heart } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo e Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#174fc9] text-white">
                <GraduationCap className="size-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Mentor<span className="text-[#f59e0b]">.ia</span>
              </span>
            </Link>
            <p className="mt-2 text-xs text-slate-500 max-w-sm">
              Tecnologia e inteligência artificial que entendem como você aprende.
              Preparação de alto impacto para o Ensino Médio e ENEM.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#como-funciona" className="hover:text-[#174fc9] transition-colors">
              Como Funciona
            </a>
            <a href="#simulador" className="hover:text-[#174fc9] transition-colors">
              Simulador
            </a>
            <a href="#metodo" className="hover:text-[#174fc9] transition-colors">
              Método 30min
            </a>
            <a href="#comparativo" className="hover:text-[#174fc9] transition-colors">
              Comparativo
            </a>
            <a href="#faq" className="hover:text-[#174fc9] transition-colors">
              FAQ
            </a>
            <Link href="/login" className="hover:text-[#174fc9] transition-colors">
              Login
            </Link>
            <Link href="/cadastro" className="text-[#174fc9] font-bold hover:underline">
              Criar Conta Grátis
            </Link>
          </div>
        </div>

        {/* Rodapé com Direitos e Aviso */}
        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>
            © {new Date().getFullYear()} Mentor.ia. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            Feito para estudantes do Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
