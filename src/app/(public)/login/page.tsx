import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/app/(public)/login/components/login-form";
import { MentorBrandPanel } from "@/components/mentor-brand-panel";

export const metadata: Metadata = {
  title: "Login | Mentor.ia",
  description: "Acesse sua conta do Mentor.ia.",
};

export default function LoginPage() {
  return (
    <main className="min-h-dvh w-full bg-white">
      <section className="grid min-h-dvh w-full overflow-hidden bg-white lg:grid-cols-[1.08fr_0.92fr]">
        <MentorBrandPanel
          title="Tecnologia que entende como você aprende."
          description="Uma experiência de estudo mais simples, organizada e personalizada para sua jornada."
        />
        <div className="flex min-h-dvh items-center justify-center px-6 py-10 sm:px-10 lg:min-h-0 lg:px-16">
          <div className="w-full max-w-[420px]">
            <div className="mb-10 lg:hidden">
              <div className="text-2xl font-extrabold text-mentor-blue">
                Mentor.ia ✦
              </div>
            </div>

            <header className="mb-10">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#22305b]">
                Bem-vindo!
              </h1>
              <p className="mt-3 text-base text-[#7180af]">
                Faça login para começar sua jornada.
              </p>
              <div className="mt-7 h-1.5 w-16 rounded-full bg-[#ffd55a]" />
            </header>

            <LoginForm />
            <p className="mt-8 text-center text-sm text-[#7180af]">
              Ainda não tem uma conta?{" "}
              <Link
                href="/cadastro"
                className="font-bold text-mentor-blue hover:underline"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
