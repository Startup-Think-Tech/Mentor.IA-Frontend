import { ArrowRight, BookOpenCheck, BrainCircuit, CalendarClock, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10 sm:py-14 lg:px-8">
        <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              EdTech para preparação ENEM
            </Badge>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Mentor.ia transforma diagnóstico em plano de estudos inteligente.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Uma plataforma educacional que cruza dados oficiais do ENEM,
                desempenho individual e apoio de inteligência artificial para
                mostrar ao aluno onde ele está, o que precisa revisar e qual é o
                próximo passo mais provável para evoluir.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg">
                Começar diagnóstico
                <ArrowRight />
              </Button>
              <Button variant="outline" size="lg">
                Ver plano de estudo
              </Button>
            </div>
          </div>

          <Card className="rounded-lg">
            <CardHeader>
              <CardDescription>Visão do aluno</CardDescription>
              <CardTitle>Ana, sua prioridade desta semana é Geometria.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <span className="text-xs text-muted-foreground">
                    Geral
                  </span>
                  <strong className="block text-2xl">68%</strong>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    Domínio
                  </span>
                  <strong className="block text-2xl">História</strong>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    Foco
                  </span>
                  <strong className="block text-2xl">Semana 04</strong>
                </div>
              </div>

              <div className="space-y-3">
                <Progress value={86} />
                <Progress value={74} />
                <Progress value={42} />
              </div>
            </CardContent>
          </Card>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="rounded-lg">
              <CardHeader>
                <feature.icon className="size-5 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      </section>
    </main>
  );
}

const features = [
  {
    title: "Diagnóstico preciso",
    description:
      "O aluno responde uma avaliação inicial e a plataforma identifica lacunas por matéria, assunto e nível de domínio.",
    icon: Target,
  },
  {
    title: "Base ENEM estruturada",
    description:
      "Conteúdos e questões oficiais alimentam a experiência para aproximar a rotina de estudo do formato real da prova.",
    icon: BookOpenCheck,
  },
  {
    title: "Mentoria com IA",
    description:
      "A IA interpreta erros, sugere revisões e entrega mensagens contextuais para manter clareza, ritmo e motivação.",
    icon: BrainCircuit,
  },
  {
    title: "Cronograma vivo",
    description:
      "O plano se adapta ao desempenho do estudante, priorizando o que mais destrava evolução nas próximas semanas.",
    icon: CalendarClock,
  },
];
