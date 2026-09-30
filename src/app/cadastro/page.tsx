import type { Metadata } from "next";
import { CadastroForm } from "./_components/CadastroForm";

export const metadata: Metadata = {
  title: "Cadastro | Mentor.ia",
  description: "Crie sua conta no Mentor.ia.",
};

export default function CadastroPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f3f4f8] p-1.5 sm:p-6">
      <section className="min-h-[calc(100dvh-12px)] w-full max-w-[420px] bg-white px-7 py-6 text-[#243650] shadow-[0_0_0_1px_rgba(15,23,42,0.02),0_12px_32px_rgba(15,23,42,0.06)] sm:min-h-[760px] sm:rounded-[2px] sm:px-7 sm:py-6">
        <CadastroForm />
      </section>
    </main>
  );
}
