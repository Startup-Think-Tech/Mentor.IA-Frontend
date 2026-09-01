export const sidebarBrand = {
  title: "Mentor.ia",
  description: "Preparacao ENEM",
  href: "/",
};

export const sidebarSections = [
  {
    title: "Aprendizado",
    items: [
      {
        title: "Dashboard",
        description: "Resumo da evolucao",
        href: "/dashboard",
        icon: "layout-dashboard",
      },
      {
        title: "Diagnostico",
        description: "Avaliacao inicial",
        href: "/diagnostico",
        icon: "clipboard-check",
      },
      {
        title: "Plano de estudos",
        description: "Rotina personalizada",
        href: "/plano-de-estudos",
        icon: "calendar-clock",
      },
    ],
  },
  {
    title: "Conteudos",
    items: [
      {
        title: "Questoes",
        description: "Banco de exercicios",
        href: "/questoes",
        icon: "book-open-check",
      },
      {
        title: "Materias",
        description: "Areas do conhecimento",
        href: "/materias",
        icon: "library-big",
      },
    ],
  },
  {
    title: "Conta",
    items: [
      {
        title: "Perfil",
        description: "Dados do estudante",
        href: "/perfil",
        icon: "user-round",
      },
      {
        title: "Configuracoes",
        description: "Preferencias do app",
        href: "/configuracoes",
        icon: "settings",
      },
    ],
  },
] as const;

export type SidebarIconName =
  (typeof sidebarSections)[number]["items"][number]["icon"];
