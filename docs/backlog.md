# 📋 Backlog de Desenvolvimento Front-end - Mentor.ia (MVP)

## 📌 Diretrizes de Arquitetura e Stack Tecnológica
*   **Framework:** Next.js (com Server-Side Rendering e roteamento baseado em arquivos via App Router)[cite: 6].
*   **Estilização e UI:** Tailwind CSS em conjunto com a biblioteca `shadcn/ui` para componentes padronizados[cite: 6].
*   **Gerenciamento de Estado:** Zustand (acesso aos estados globais por meio de hooks)[cite: 6].
*   **Consumo de API:** Fetch API nativa (proibido usar Axios) para requisições GET, POST, PUT, PATCH e DELETE[cite: 6].
*   **Padrão de Qualidade:** Biome para formatação e análise estática do código[cite: 6].
*   **Estrutura de Pastas (Monólito Modular):** O código deve seguir a estrutura `src/app`, `src/components`, `src/modules`, `src/services/api`, `src/stores`, `src/hooks`, `src/lib` e `src/types`[cite: 6].
*   **Prefixo Base da API Backend:** Todas as rotas do servidor próprio utilizam o prefixo `/api/v1`[cite: 5].

---

## 🚀 Epic 1: Setup e Infraestrutura Base
### Task 1.1: Inicialização do Projeto
- [ ] Configurar Next.js com App Router[cite: 6].
- [ ] Inicializar o Tailwind CSS e configurar variáveis de cor da marca (Mentor.ia Deep Blue, Branco, cores semânticas de gaps).
- [ ] Configurar a CLI do `shadcn/ui` e instalar os componentes base (Button, Input, Card, Progress, Form, Toast)[cite: 6].
- [ ] Configurar o Biome para linting e formatação do projeto[cite: 6].

### Task 1.2: Serviços e Proteção de Rotas
- [ ] Criar client base com Fetch API (`src/services/api/client.ts`) para injetar automaticamente o JWT nas requisições.
- [ ] Configurar tratamento global de erros para capturar status HTTP 400, 401, 403, 404 e 500 de forma clara para o usuário[cite: 6].
- [ ] Implementar a proteção de rotas privadas utilizando o arquivo `proxy.ts` (Next.js middleware) com a propriedade `matcher`[cite: 6].

---

## 🔐 Epic 2: Autenticação
*Regra de Segurança: O JWT retornado deve ser armazenado no Local Storage[cite: 6].*

### Task 2.1: Tela de Login (`/login`)
**Referência de Design:** `docs/design/stitch_mentor.ia_ui_redesign_dashboard/mentor.ia_login_mobile/` (Figma + Stitch)
- [ ] Layout mobile-first (max ~420px), fundo com gradiente da marca (`#2550bf` → `#1c40a3`) e elementos decorativos em blur (círculos azul/índigo translúcidos).
- [ ] Cabeçalho de boas-vindas: título "Bem-vindo de volta !" + subtítulo "Faça login para continuar sua jornada.".
- [ ] Seção de marca: ilustração SVG (capelo de formatura), nome "Mentor**.ia**" (destacar `.ia` em âmbar `#fbbf24`) e tagline "Tecnologia que entende como você aprende.".
- [ ] Formulário (`shadcn/ui`): campos E-mail e Senha com inputs `h-12 rounded-xl bg-white/20` (placeholder `blue-200/60`).
- [ ] Toggle de visibilidade da senha (ícone de olho) no campo Senha.
- [ ] Botão primário "Entrar" (`#4268bd`, hover `#4d75d1`, `h-12 rounded-xl`, sombra `shadow-blue-900/40`).
- [ ] Rodapé com links "Esqueceu a senha?" (`blue-100`, sublinhado) e "Criar conta" (branco, bold).
- [ ] Integrar `POST /api/v1/auth/login`[cite: 5] com tratamento de erros 400/401/403/404/500.
- [ ] Salvar token JWT no Local Storage e redirecionar para `/dashboard`[cite: 6].

### Task 2.2: Tela de Cadastro (`/cadastro`)
- [ ] Criar formulário de registro com validação de senha.
- [ ] Integrar com `POST /api/v1/auth/register`[cite: 5].
- [ ] Redirecionar usuário logado automaticamente para a tela de Onboarding.

---

## 🛣️ Epic 3: Onboarding e Disponibilidade
### Task 3.1: Fluxo de Coleta de Tempo e Dias
- [ ] Construir componentes visuais interativos (Grid de dias, botões rádio para 30min, 1h, etc).
- [ ] Submeter os dados finais da disponibilidade chamando `PUT /api/v1/alunos/me/disponibilidade`[cite: 5].
- [ ] Salvar payload de usuário globalmente utilizando o Zustand[cite: 6].

---

## 🧠 Epic 4: Diagnóstico Adaptativo (Quiz)
*Atenção à Regra de Arquitetura: O backend próprio não armazena enunciados de questões[cite: 5].*

### Task 4.1: Inicialização e Carga do Quiz
- [ ] Criar interface de quiz com Barra de Progresso.
- [ ] Iniciar a sessão via `POST /api/v1/diagnosticos`[cite: 5].
- [ ] Buscar a matriz de questões via `GET /api/v1/diagnosticos/:id/questoes`[cite: 5]. *Nota: Isso retorna apenas referências externas (`year`, `index`, `language`)[cite: 5].*
- [ ] **Integração Externa:** Para cada questão, realizar um Fetch direto no frontend para a API pública do ENEM: `https://api.enem.dev/v1/exams/{year}/questions/{index}` para renderizar o enunciado e as alternativas[cite: 5].
- [ ] Fazer cache local das referências das questões e implementar cancelamento de requisição (AbortController) se o usuário pular a questão rapidamente[cite: 5].

### Task 4.2: Respostas e Conclusão
- [ ] Enviar a alternativa marcada de cada questão via `POST /api/v1/diagnosticos/:id/respostas`[cite: 5].
- [ ] A correção do acerto é calculada no cliente (comparando com o gabarito público da API do ENEM) e enviada, mas o backend salvará como "não verificado pelo servidor"[cite: 5].
- [ ] Ao terminar, disparar `POST /api/v1/diagnosticos/:id/finalizar`[cite: 5].
- [ ] Navegar o usuário de volta para o Dashboard.

---

## 🏠 Epic 5: Área Logada (Dashboard Principal)
### Task 5.1: Visão Geral e Gaps
- [ ] Construir layout com `<Link />` do Next.js na Bottom Navigation[cite: 6].
- [ ] Buscar os dados consolidados do painel acessando a rota unificada `GET /api/v1/dashboard/resumo`[cite: 5].
- [ ] Renderizar gráfico circular (Donut Chart) e a lista de prioridades de Gaps com as cores semânticas apropriadas.

### Task 5.2: Geração Assíncrona de Insights IA (Polling)
- [ ] Acionar o serviço de inteligência artificial enviando payload para `POST /api/v1/insights/gerar`[cite: 5].
- [ ] Capturar o `job_id` retornado com status HTTP 202[cite: 5].
- [ ] Implementar mecanismo de *Polling* no componente com Zustand/Fetch:
  - Consultar `GET /api/v1/insights/jobs/:jobId` a cada 2 segundos[cite: 5].
  - Aumentar dinamicamente o intervalo de consulta até o limite de 10 segundos[cite: 5].
  - Interromper o loop assim que o status retornar `concluido` (carregando o novo `insight_id`) ou `falhou`[cite: 5].
  - Parar de buscar ao sair da tela (desmontar componente) ou ultrapassar 2 minutos[cite: 5].
- [ ] Renderizar a mensagem motivacional da IA retornada no Card "Mentor.ia Insights".