import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login | Mentor.ia",
  description: "Acesse sua conta do Mentor.ia.",
};

export default function LoginPage() {
  return (
    <main className="min-h-dvh w-full bg-white">
      <section className="grid min-h-dvh w-full overflow-hidden bg-white lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative hidden overflow-hidden bg-[#3555b6] px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3 text-2xl font-extrabold">
            <span>Mentor.ia</span>
            <span className="text-[#ffd55a]">✦</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/figma/login/illustration.png"
              alt=""
              width={271}
              height={281}
              priority
              className="mb-8 h-auto w-[260px]"
            />
            <h2 className="max-w-xl text-4xl font-extrabold leading-tight">
              Tecnologia que entende como você aprende.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-white/80">
              Uma experiência de estudo mais simples, organizada e personalizada
              para sua jornada.
            </p>
          </div>

          <p className="text-sm text-white/60">
            Mentor.ia • tecnologia que entende como você aprende.
          </p>
        </div>
        <div className="flex min-h-dvh items-center justify-center px-6 py-10 sm:px-10 lg:min-h-0 lg:px-16">
          <div className="w-full max-w-[420px]">
            <div className="mb-10 lg:hidden">
              <div className="text-2xl font-extrabold text-[#3555b6]">
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
                className="font-bold text-[#3555b6] hover:underline"
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
