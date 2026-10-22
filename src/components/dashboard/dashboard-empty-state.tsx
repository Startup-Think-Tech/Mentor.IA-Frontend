import Link from "next/link";

export function DashboardEmptyState() {
  return (
    <section className="rounded-3xl border border-[#e4e8f2] bg-white p-8">
      <h2 className="text-xl font-bold text-[#22305b]">Seu plano ainda não está completo</h2>
      <p className="mt-2 max-w-xl text-[#52639c]">
        Escolha seus dias e tempo de estudo e conclua o diagnóstico para visualizar seus resultados.
      </p>
      <Link
        href="/onboarding"
        className="mt-5 inline-flex rounded-xl bg-mentor-blue px-5 py-3 text-sm font-semibold text-white hover:bg-mentor-blue-hover"
      >
        Configurar meus estudos
      </Link>
    </section>
  );
}
