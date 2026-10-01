import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Cadastro | Mentor.ia",
  description: "Crie sua conta no Mentor.ia.",
};

export default function CadastroPage() {
  return (
    <main className="min-h-dvh bg-white">
      <section className="grid min-h-dvh lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-[#3555b6] px-16 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3 text-3xl font-extrabold">
            <span>Mentor.ia</span>
            <span className="text-[#ffd55a]">✦</span>
          </div>
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight">
              Comece sua jornada de{" "}
              <span className="text-[#ffd55a]">evolução</span>
            </h1>
            <p className="mt-6 max-w-lg text-xl leading-9 text-white/85">
              Crie sua conta e tenha acesso a uma experiência personalizada
              para desenvolver suas habilidades e alcançar seus objetivos.
            </p>

            <Image
              src="/figma/login/illustration.png"
              alt=""
              width={271}
              height={281}
              priority
              className="mt-10 h-auto w-[300px]"
            />
          </div>
          <p className="text-sm text-white/60">
            Mentor.ia • tecnologia que entende como você aprende.
          </p>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-[520px]">
            <div className="mb-8 flex items-center justify-between">
              <div className="text-2xl font-extrabold text-[#3555b6] lg:hidden">
                Mentor.ia ✦
              </div>

              <p className="ml-auto text-sm text-[#7180af]">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#3555b6] hover:underline"
                >
                  Entrar
                </Link>
              </p>
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
          </div>
        </div>
      </section>
    </main>
  );
}
