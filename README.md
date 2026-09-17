# Mentor.ia App

Frontend Next.js da plataforma Mentor.ia. A interface atende a jornada do aluno na preparação ENEM: cadastro, login, diagnóstico, dashboard de evolução, cronograma personalizado, revisões, sessões de estudo e insights motivacionais com IA.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- React Query
- React Hook Form e Zod
- shadcn/ui e Base UI
- Recharts para visualizações

## Setup

```bash
npm install
npm run dev
```

A aplicação roda por padrão em `http://localhost:3000`.

## Fluxos principais

- Autenticação: cadastro público de aluno, login, logout, sessão atual e recuperação de senha.
- Perfil do aluno: edição de dados pessoais e disponibilidade semanal de estudo.
- Diagnóstico: criação de avaliação, listagem de questões, envio de respostas e visualização do resultado.
- Questões ENEM: carregamento direto da API externa `https://api.enem.dev/v1/exams/{year}/questions/{index}` com cache, cancelamento de requisições e tratamento de falhas.
- Dashboard: visão `resumo` e `historico`, com filtros por período e disciplina.
- Cronograma: geração, visualização do cronograma atual, histórico e sessões do dia.
- Revisões: pendentes, atrasadas, histórico e registro de resultado.
- Insights: solicitação assíncrona, consulta de job e exibição do insight persistido.
- Painel admin: gestão de alunos, disciplinas, conteúdos e operações administrativas nos módulos de negócio.

## Integração com API

O backend planejado expõe rotas com prefixo `/api/v1` e documentação Swagger em `/api/docs`. Configure a URL da API conforme o ambiente de execução do frontend.

Exemplo de variável recomendada:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
```

## Regras importantes

- O aluno não envia `aluno_id` livre nas rotas comuns; o escopo vem da sessão autenticada.
- O painel administrativo usa `:alunoId` nas rotas administrativas e precisa validar posse dos recursos.
- A API Mentor.ia não possui catálogo local de enunciados ou alternativas do ENEM.
- Falha ao buscar uma questão externa não deve ser registrada como resposta errada.
- Respostas corrigidas apenas no cliente devem ser marcadas como não verificadas pelo servidor.
- Jobs de IA devem ser consultados por polling progressivo e sem reenviar geração automaticamente.

## Scripts úteis

```bash
npm run dev
npm run build
npm run start
npm run lint
```
