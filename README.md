# Mentor.ia App

Frontend Next.js da plataforma Mentor.ia, uma aplicação educacional para preparação ENEM baseada no ciclo `Diagnosticar -> Identificar gaps -> Priorizar -> Planejar -> Estudar -> Avaliar -> Adaptar`.

O app entrega a experiência do aluno: cadastro, login, onboarding de disponibilidade, diagnóstico, dashboard de evolução, cronograma, sessões de estudo, revisões e insights motivacionais gerados por IA.

## Visão Do Produto

O Mentor.ia substitui cronogramas genéricos por uma jornada adaptativa. O aluno informa disponibilidade, responde um diagnóstico, visualiza gaps e recebe um plano de estudos orientado por prioridades. Ao concluir sessões e revisões, novos dados realimentam o sistema para adaptar atividades futuras.

Proposta de valor:

- Mostrar ao aluno o que estudar agora.
- Explicar por que certos conteúdos são prioridade.
- Reduzir desperdício de tempo com conteúdos já dominados.
- Manter histórico de evolução.
- Apoiar motivação com insights contextualizados.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- React Query para server state
- nuqs para estado em URL/search params
- React Hook Form e Zod para formulários
- shadcn/ui e Base UI para componentes
- Recharts para visualizações
- Sonner para feedbacks/toasts
- date-fns para datas

## Arquitetura Frontend

```text
Next.js App Router
  -> Páginas e layouts
  -> Componentes de domínio
  -> Componentes UI reutilizáveis
  -> Hooks de consulta/mutação
  -> Cliente HTTP da API
  -> React Query cache
  -> Estado de URL com nuqs
```

Princípios:

- O frontend não acessa PostgreSQL, Redis, BullMQ nem serviços de IA diretamente.
- Toda regra sensível e persistência passam pelo backend.
- A API ENEM externa pode ser consultada diretamente pelo frontend somente para carregar enunciados e alternativas das questões referenciadas pelo backend.
- Dados autenticados usam o escopo da sessão, não `aluno_id` livre enviado em rotas comuns.
- Falha ao carregar questão externa não deve registrar resposta errada.
- Jobs de IA devem usar polling progressivo e permitir retomada por `job_id`.

## Estrutura De Pastas Atual

```text
app/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
    components/
      FormLayout/
      SidebarLayout/
      ui/
    hooks/
    lib/
      nuqs/
      react-query/
      utils.ts
```

Estrutura planejada para evolução:

```text
src/
  app/
    (public)/
      login/
      cadastro/
      esqueceu-senha/
      redefinir-senha/
    (student)/
      dashboard/
      onboarding/
      diagnostico/
      cronograma/
      sessoes/
      revisoes/
      insights/
      perfil/
    (admin)/
      admin/
        alunos/
        disciplinas/
        gaps/
        cronogramas/
  components/
  features/
    auth/
    alunos/
    diagnosticos/
    gaps/
    cronogramas/
    sessoes-estudo/
    revisoes/
    dashboard/
    insights/
  lib/
    api/
    enem/
    react-query/
    nuqs/
```

## Setup Local

Instale dependências:

```bash
npm install
```

Configure a URL da API:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
NEXT_PUBLIC_ENEM_API_URL="https://api.enem.dev/v1"
```

Inicie o desenvolvimento:

```bash
npm run dev
```

Ou suba pelo Docker Compose a partir da pasta `app/`:

```bash
docker compose up -d
```

URLs locais:

- App: `http://localhost:3000`
- API: `http://localhost:3001/api/v1`
- Swagger: `http://localhost:3001/api/docs`

## Jornada Do Usuário

Fluxo principal do MVP:

```text
Cadastro
  -> Login
  -> Onboarding de disponibilidade
  -> Quiz diagnóstico
  -> Resultado do diagnóstico
  -> Dashboard de gaps
  -> Cronograma personalizado
  -> Sessões de estudo
  -> Revisões
  -> Atualização do desempenho
  -> Adaptação do cronograma
  -> Insights motivacionais
```

Etapas:

1. Cadastro e autenticação: aluno cria conta e acessa áreas protegidas.
2. Onboarding: aluno informa dias e minutos disponíveis.
3. Diagnóstico: aluno responde questões referenciadas pelo backend.
4. Resultado: app exibe desempenho por disciplina/conteúdo.
5. Gaps: app destaca pontos de atenção e prioridade.
6. Cronograma: app mostra sessões planejadas por dia.
7. Execução: aluno conclui ou perde sessões.
8. Revisão: aluno registra resultados para revisão espaçada.
9. Dashboard: app mostra resumo e histórico.
10. IA: app solicita insight, consulta job e exibe resultado.

## Personas E UX

Persona principal:

- Lucas Andrade, 17 anos, estudante do terceiro ano.
- Pouco tempo, rotina irregular e dificuldade para priorizar conteúdos.
- Precisa saber o que estudar em cada dia e perceber evolução.

Persona secundária:

- Marina Souza, 20 anos, egressa do ensino médio.
- Já domina parte do conteúdo, mas precisa recuperar pontos específicos.
- Precisa evitar estudar novamente conteúdos que já domina.

Diretrizes de UX:

- Priorizar clareza sobre complexidade algorítmica.
- Mostrar motivo da prioridade sempre que possível.
- Indicar progresso com feedback visual simples.
- Evitar punir o aluno visualmente por erro ou sessão perdida.
- Tratar falhas externas com mensagens recuperáveis.
- Usar linguagem motivacional, objetiva e acolhedora.

## Telas Planejadas

### Públicas

- Landing page.
- Cadastro.
- Login.
- Esqueci minha senha.
- Redefinir senha.

### Aluno

- Onboarding de disponibilidade.
- Dashboard resumo.
- Dashboard histórico.
- Diagnóstico atual.
- Histórico de diagnósticos.
- Quiz diagnóstico.
- Resultado do diagnóstico.
- Gaps de aprendizagem.
- Cronograma atual.
- Histórico de cronogramas.
- Sessões do dia.
- Lista de sessões.
- Revisões pendentes.
- Revisões atrasadas.
- Histórico de revisões.
- Insights.
- Perfil.

### Admin

- Lista de alunos.
- Detalhe do aluno.
- Disponibilidade do aluno.
- Diagnósticos do aluno.
- Cronogramas do aluno.
- Sessões do aluno.
- Gaps do aluno.
- Gestão de disciplinas.
- Gestão de conteúdos.

## Rotas Do App Planejadas

Rotas sugeridas para App Router:

```text
/
/login
/cadastro
/esqueceu-senha
/redefinir-senha
/onboarding/disponibilidade
/dashboard
/dashboard/historico
/diagnostico
/diagnostico/[id]
/diagnostico/[id]/questoes
/diagnostico/[id]/resultado
/gaps
/cronograma
/cronograma/historico
/cronograma/[id]
/cronograma/[id]/revisoes
/sessoes
/sessoes/hoje
/revisoes
/insights
/perfil
/admin/alunos
/admin/alunos/[alunoId]
/admin/disciplinas
```

## Integração Com API

Prefixo da API:

```text
http://localhost:3001/api/v1
```

Documentação Swagger:

```text
http://localhost:3001/api/docs
```

Health:

```text
GET /api/v1/health
```

### Rotas Consumidas Pelo Frontend

Autenticação:

| Método | Rota                    | Uso no app            |
| ------ | ----------------------- | --------------------- |
| POST   | `/auth/register`        | Cadastro              |
| POST   | `/auth/login`           | Login                 |
| POST   | `/auth/logout`          | Sair                  |
| GET    | `/auth/me`              | Sessão atual          |
| POST   | `/auth/esqueceu-senha`  | Solicitar recuperação |
| POST   | `/auth/redefinir-senha` | Redefinir senha       |

Aluno:

| Método | Rota                         | Uso no app             |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/alunos/me`                 | Perfil                 |
| PATCH  | `/alunos/me`                 | Editar perfil          |
| GET    | `/alunos/me/disponibilidade` | Onboarding/agenda      |
| PUT    | `/alunos/me/disponibilidade` | Salvar disponibilidade |

Diagnóstico:

| Método | Rota                                      | Uso no app               |
| ------ | ----------------------------------------- | ------------------------ |
| POST   | `/diagnosticos`                           | Criar diagnóstico        |
| GET    | `/diagnosticos/atual`                     | Retomar diagnóstico      |
| GET    | `/diagnosticos/historico`                 | Histórico                |
| GET    | `/diagnosticos/:id`                       | Detalhe                  |
| GET    | `/diagnosticos/:id/questoes`              | Referências das questões |
| POST   | `/diagnosticos/:id/respostas`             | Enviar resposta          |
| PATCH  | `/diagnosticos/:id/respostas/:respostaId` | Alterar resposta         |
| POST   | `/diagnosticos/:id/finalizar`             | Finalizar diagnóstico    |
| GET    | `/diagnosticos/:id/resultado`             | Resultado                |

Desempenho e gaps:

| Método | Rota                                        | Uso no app             |
| ------ | ------------------------------------------- | ---------------------- |
| GET    | `/diagnosticos/desempenhos`                 | Resumo de desempenho   |
| GET    | `/diagnosticos/desempenhos/historico`       | Evolução               |
| GET    | `/diagnosticos/desempenhos/disciplinas/:id` | Detalhe por disciplina |
| GET    | `/gaps`                                     | Ranking atual          |
| GET    | `/gaps/historico`                           | Histórico de gaps      |
| GET    | `/gaps/:id`                                 | Detalhe do gap         |

Cronograma, sessões e revisões:

| Método | Rota                                                | Uso no app             |
| ------ | --------------------------------------------------- | ---------------------- |
| POST   | `/cronogramas/gerar`                                | Gerar cronograma       |
| GET    | `/cronogramas/atual`                                | Cronograma atual       |
| GET    | `/cronogramas/historico`                            | Histórico              |
| GET    | `/cronogramas/:id`                                  | Detalhe                |
| POST   | `/cronogramas/recalcular`                           | Adaptar cronograma     |
| GET    | `/sessoes-estudo`                                   | Lista de sessões       |
| GET    | `/sessoes-estudo/hoje`                              | Plano do dia           |
| POST   | `/sessoes-estudo/:id/concluir`                      | Concluir sessão        |
| POST   | `/sessoes-estudo/:id/perder`                        | Marcar perdida         |
| GET    | `/cronogramas/:cronogramaId/revisoes`               | Revisões do cronograma |
| GET    | `/cronogramas/:cronogramaId/revisoes/pendentes`     | Revisões pendentes     |
| GET    | `/cronogramas/:cronogramaId/revisoes/atrasadas`     | Revisões atrasadas     |
| POST   | `/cronogramas/:cronogramaId/revisoes/:id/resultado` | Registrar resultado    |

Dashboard e insights:

| Método | Rota                    | Uso no app          |
| ------ | ----------------------- | ------------------- |
| GET    | `/dashboard/resumo`     | Dashboard principal |
| GET    | `/dashboard/historico`  | Histórico paginado  |
| POST   | `/insights/gerar`       | Solicitar insight   |
| GET    | `/insights/jobs/:jobId` | Consultar job       |
| GET    | `/insights`             | Listar insights     |
| GET    | `/insights/:id`         | Detalhe             |

## Questões ENEM No Frontend

O backend retorna referências externas das questões selecionadas:

```json
{
  "year": 2023,
  "index": 1,
  "language": "default",
  "ordem": 1,
  "disciplina_id": "...",
  "conteudo_id": "..."
}
```

O frontend busca o conteúdo da questão em:

```text
GET https://api.enem.dev/v1/exams/{year}/questions/{index}
```

Regras no app:

- Cachear por `year:index:language`.
- Cancelar requisições ao trocar de questão.
- Tratar timeout, 404 e falha de rede.
- Não registrar falha de fetch como erro do aluno.
- Marcar resposta corrigida no cliente como não verificada pelo servidor.

## Estado E Dados

Uso recomendado:

- React Query para dados remotos, cache, invalidação e polling.
- nuqs para filtros em URL: período, disciplina, paginação, visão do dashboard.
- React Hook Form + Zod para formulários de cadastro, login, disponibilidade e respostas.
- Estado local para interações transitórias da UI.

Chaves de cache sugeridas:

```text
auth.me
alunos.me
alunos.me.disponibilidade
diagnosticos.atual
diagnosticos.historico
diagnosticos.detail(id)
diagnosticos.questoes(id)
diagnosticos.resultado(id)
gaps.list
cronogramas.atual
sessoes.hoje
dashboard.resumo(filters)
dashboard.historico(filters)
insights.jobs(jobId)
insights.list
enem.question(year, index, language)
```

## Polling De Insights

Fluxo de UX:

1. Usuário clica para gerar insight.
2. App envia `POST /insights/gerar`.
3. API retorna `202` com `job_id`.
4. App consulta `/insights/jobs/:jobId` a cada `2s`.
5. Intervalo aumenta gradualmente até `10s`.
6. Polling para em `concluido` ou `falhou`.
7. Após `2min`, app informa que o processamento continua em segundo plano.
8. Se o usuário sair da tela, o polling é cancelado e pode ser retomado pelo `job_id`.

## Regras Do Produto Na Interface

- Desempenho inferior a `50%` deve ser visualmente destacado como alta prioridade.
- Gaps devem ser ordenados por prioridade.
- Revisões atrasadas aparecem antes de estudos novos.
- Sessões perdidas não desaparecem; devem comunicar reorganização.
- Cronograma deve mostrar disciplina, conteúdo, tipo e duração.
- Histórico deve preservar diagnósticos, revisões e cronogramas antigos.
- IA deve explicar e motivar, sem parecer substituir o motor determinístico.

## Algoritmo Exibido Ao Usuário

O app pode apresentar explicações simplificadas:

```text
Prioridade = dificuldade + urgência de revisão
```

Faixas:

| Nível   | Uso na interface      |
| ------- | --------------------- |
| Baixa   | Conteúdo sob controle |
| Média   | Reforço recomendado   |
| Alta    | Prioridade de estudo  |
| Crítica | Atenção imediata      |

Revisão espaçada:

```text
1 dia -> 3 dias -> 7 dias -> 14 dias -> 30 dias
```

## Componentização

Componentes de domínio sugeridos:

- `AvailabilityEditor`
- `DiagnosticQuestionCard`
- `DiagnosticProgress`
- `PerformanceSummaryCards`
- `GapRanking`
- `StudyPlanCalendar`
- `StudySessionCard`
- `ReviewList`
- `InsightJobStatus`
- `InsightCard`
- `DashboardHistoryChart`

Componentes de layout já existentes:

- `SidebarLayout`
- `Sidebar`
- `SidebarNavGroup`
- `SidebarNavItem`

Componentes de formulário já existentes:

- `ZodForm`
- `ControlledTextField`

## Acessibilidade E Responsividade

- Layout totalmente responsivo.
- Fluxo do quiz operável por teclado.
- Estados de loading e erro claros.
- Textos de prioridade não devem depender apenas de cor.
- Gráficos devem ter rótulos e fallback textual.
- Botões de ação destrutiva/admin devem ter confirmação.

## Scripts Úteis

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Qualidade

Definition of Ready:

- História ou requisito mapeado.
- Contrato de API definido.
- Critérios de aceitação claros.
- Estados de loading, erro e vazio previstos.

Definition of Done:

- Tela integrada com API ou mock equivalente aprovado.
- Validação de formulário implementada.
- Responsividade desktop/mobile verificada.
- Acessibilidade básica validada.
- Fluxos felizes e principais erros testados.

## Roadmap MVP

1. Fundação visual, layout autenticado e providers.
2. Autenticação e onboarding de disponibilidade.
3. Quiz diagnóstico e busca de questões ENEM.
4. Resultado, gaps e dashboard inicial.
5. Cronograma, sessões e revisões.
6. Insights assíncronos e dashboard integrado.
7. Testes, polimento, responsividade e release candidate.

## Fora Do Escopo Do MVP

- Módulo de professores.
- Pagamentos ou assinaturas.
- Gamificação completa.
- Portal para responsáveis/instituições.
- Edição manual de questões ENEM.
