import type { QuizQuestion } from "@/types/quiz";

export const diagnosticQuestionsMock: QuizQuestion[] = [
  {
    id: "mock-mat-1",
    index: 1,
    year: 2023,
    discipline: "matematica",
    subject: "Matemática",
    topic: "Álgebra & Funções",
    title:
      "Qual das alternativas abaixo representa a lei de formação de uma função afim (1º grau)?",
    context: "Considere coeficientes reais com a ≠ 0.",
    alternatives: [
      { letter: "A", text: "f(x) = ax + b" },
      { letter: "B", text: "f(x) = ax² + bx + c" },
      { letter: "C", text: "f(x) = a/x + b" },
      { letter: "D", text: "f(x) = √x + b" },
    ],
    correctAlternative: "A",
  },
  {
    id: "mock-mat-2",
    index: 2,
    year: 2023,
    discipline: "matematica",
    subject: "Matemática",
    topic: "Porcentagem & Proporção",
    title:
      "Um produto de R$ 200 recebeu desconto de 15%. Qual é o novo preço?",
    alternatives: [
      { letter: "A", text: "R$ 150" },
      { letter: "B", text: "R$ 160" },
      { letter: "C", text: "R$ 170" },
      { letter: "D", text: "R$ 185" },
    ],
    correctAlternative: "C",
  },
  {
    id: "mock-ling-1",
    index: 3,
    year: 2023,
    discipline: "linguagens",
    subject: "Linguagens",
    topic: "Interpretação de Texto",
    title:
      "Em um texto argumentativo, qual elemento apresenta a posição central defendida pelo autor?",
    alternatives: [
      { letter: "A", text: "A tese" },
      { letter: "B", text: "A legenda" },
      { letter: "C", text: "O título obrigatoriamente" },
      { letter: "D", text: "A referência bibliográfica" },
    ],
    correctAlternative: "A",
  },
  {
    id: "mock-ling-2",
    index: 4,
    year: 2023,
    discipline: "linguagens",
    subject: "Linguagens",
    topic: "Figuras de Linguagem",
    title:
      "Na frase “A cidade acordou com pressa”, qual figura de linguagem atribui ação humana à cidade?",
    alternatives: [
      { letter: "A", text: "Hipérbole" },
      { letter: "B", text: "Personificação" },
      { letter: "C", text: "Antítese" },
      { letter: "D", text: "Eufemismo" },
    ],
    correctAlternative: "B",
  },
  {
    id: "mock-human-1",
    index: 5,
    year: 2023,
    discipline: "ciencias-humanas",
    subject: "Ciências Humanas",
    topic: "História do Brasil",
    title:
      "Qual processo histórico marcou a passagem do Brasil de colônia portuguesa para um Estado politicamente independente?",
    alternatives: [
      { letter: "A", text: "Independência do Brasil" },
      { letter: "B", text: "Revolução Industrial" },
      { letter: "C", text: "Reforma Protestante" },
      { letter: "D", text: "Guerra Fria" },
    ],
    correctAlternative: "A",
  },
  {
    id: "mock-human-2",
    index: 6,
    year: 2023,
    discipline: "ciencias-humanas",
    subject: "Ciências Humanas",
    topic: "Geografia",
    title:
      "Qual conceito descreve o crescimento da população que vive em cidades?",
    alternatives: [
      { letter: "A", text: "Êxodo urbano" },
      { letter: "B", text: "Urbanização" },
      { letter: "C", text: "Industrialização agrícola" },
      { letter: "D", text: "Intemperismo" },
    ],
    correctAlternative: "B",
  },
  {
    id: "mock-nature-1",
    index: 7,
    year: 2023,
    discipline: "ciencias-natureza",
    subject: "Ciências da Natureza",
    topic: "Física",
    title:
      "Um carro percorre 120 km em 2 horas, mantendo velocidade média constante. Qual é sua velocidade média?",
    alternatives: [
      { letter: "A", text: "40 km/h" },
      { letter: "B", text: "50 km/h" },
      { letter: "C", text: "60 km/h" },
      { letter: "D", text: "80 km/h" },
    ],
    correctAlternative: "C",
  },
  {
    id: "mock-nature-2",
    index: 8,
    year: 2023,
    discipline: "ciencias-natureza",
    subject: "Ciências da Natureza",
    topic: "Biologia",
    title:
      "Qual organela celular está diretamente relacionada à produção de ATP na respiração celular aeróbica?",
    alternatives: [
      { letter: "A", text: "Lisossomo" },
      { letter: "B", text: "Mitocôndria" },
      { letter: "C", text: "Complexo golgiense" },
      { letter: "D", text: "Ribossomo" },
    ],
    correctAlternative: "B",
  },
];
