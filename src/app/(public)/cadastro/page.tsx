import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { RegisterForm } from "@/app/(public)/cadastro/components/register-form";
import { MentorBrandPanel } from "@/components/mentor-brand-panel";

export const metadata: Metadata = {
  title: "Cadastro | Mentor.ia",
  description: "Crie sua conta no Mentor.ia.",
};

export default function CadastroPage() {
  return (
    <main className="min-h-dvh bg-white">
      <section className="grid min-h-dvh lg:grid-cols-[1.05fr_0.95fr]">
        <MentorBrandPanel
          title={
            <>
              Comece sua jornada de{" "}
              <span className="text-[#ffd55a]">evolução</span>
            </>
          }
          description="Crie sua conta e tenha acesso a uma experiência personalizada para desenvolver suas habilidades e alcançar seus objetivos."
        />

        <div className="relative flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <Link
            href="/"
            className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm font-semibold text-[#52639c] transition-colors hover:text-mentor-blue sm:left-10 lg:left-16"
          >
            <ArrowLeft className="size-4" />
            Voltar ao início
          </Link>
          <div className="w-full max-w-[520px]">
            <div className="mb-8">
              <div className="text-2xl font-extrabold text-mentor-blue lg:hidden">
                Mentor.ia ✦
              </div>
            </div>
            <header className="mb-8">
              <h2 className="text-4xl font-extrabold tracking-tight text-[#22305b]">
                Criar sua conta
              </h2>
              <p className="mt-3 text-base text-[#7180af]">
                Preencha os dados abaixo para começar sua jornada.
              </p>
              <div className="mt-6 h-1.5 w-16 rounded-full bg-[#ffd55a]" />
            </header>

            <RegisterForm />
            <p className="mt-8 text-center text-sm text-[#7180af]">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-bold text-mentor-blue hover:underline"
              >
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
