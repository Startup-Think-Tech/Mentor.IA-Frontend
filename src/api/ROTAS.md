# Rotas do backend Mentor.IA

Base padrão: http://localhost:3333/api/v1 (pode mudar por configuração).

Estes arquivos JSON são mocks ilustrativos, não respostas verificadas de todas as rotas. Não executam requisições e não substituem a API real.

## Rotas encontradas

### alunos
Consulta e atualização do perfil do aluno e sua disponibilidade.
Mock: `alunos.json`

- `GET /api/v1/alunos/me` — Consulta informações em alunos.
- `PATCH /api/v1/alunos/me` — Atualiza informações em alunos.
- `GET /api/v1/alunos/me/disponibilidade` — Consulta informações em alunos.
- `PUT /api/v1/alunos/me/disponibilidade` — Atualiza informações em alunos.

### auth
Cadastro, login, tokens, sessão e recuperação de senha.
Mock: `auth.json`

- `POST /api/v1/auth/register` — Cria ou executa ação em auth.
- `POST /api/v1/auth/login` — Cria ou executa ação em auth.
- `POST /api/v1/auth/refresh` — Cria ou executa ação em auth.
- `POST /api/v1/auth/logout` — Cria ou executa ação em auth.
- `GET /api/v1/auth/me` — Consulta informações em auth.
- `POST /api/v1/auth/esqueceu-senha` — Cria ou executa ação em auth.
- `POST /api/v1/auth/redefinir-senha` — Cria ou executa ação em auth.

### dashboard
Resumo ou histórico de indicadores do aluno.
Mock: `dashboard.json`

- `GET /api/v1/dashboard/:visao` — Consulta informações em dashboard.

### diagnosticos
Criação, respostas, finalização, questões e resultados de diagnósticos.
Mock: `diagnosticos.json`

- `GET /api/v1/diagnosticos/desempenhos` — Consulta informações em diagnosticos.
- `GET /api/v1/diagnosticos/desempenhos/historico` — Consulta informações em diagnosticos.
- `GET /api/v1/diagnosticos/desempenhos/disciplinas/:id` — Consulta informações em diagnosticos.
- `POST /api/v1/diagnosticos` — Cria ou executa ação em diagnosticos.
- `GET /api/v1/diagnosticos/atual` — Consulta informações em diagnosticos.
- `GET /api/v1/diagnosticos/historico` — Consulta informações em diagnosticos.
- `POST /api/v1/diagnosticos/:id/respostas` — Cria ou executa ação em diagnosticos.
- `PATCH /api/v1/diagnosticos/:id/respostas/:respostaId` — Atualiza informações em diagnosticos.
- `POST /api/v1/diagnosticos/:id/finalizar` — Cria ou executa ação em diagnosticos.
- `GET /api/v1/diagnosticos/:id/resultado` — Consulta informações em diagnosticos.
- `GET /api/v1/diagnosticos/:id/questoes` — Consulta informações em diagnosticos.
- `GET /api/v1/diagnosticos/:id` — Consulta informações em diagnosticos.

### admin
Administração de disciplinas, conteúdos e desempenho de alunos.
Mock: `admin.json`

- `GET /api/v1/admin/alunos/:alunoId/diagnosticos/desempenhos` — Consulta informações em admin.
- `GET /api/v1/admin/alunos/:alunoId/diagnosticos/desempenhos/historico` — Consulta informações em admin.
- `GET /api/v1/admin/alunos/:alunoId/diagnosticos/desempenhos/disciplinas/:id` — Consulta informações em admin.
- `GET /api/v1/admin/disciplinas` — Consulta informações em admin.
- `GET /api/v1/admin/disciplinas/:id` — Consulta informações em admin.
- `POST /api/v1/admin/disciplinas` — Cria ou executa ação em admin.
- `PATCH /api/v1/admin/disciplinas/:id` — Atualiza informações em admin.
- `DELETE /api/v1/admin/disciplinas/:id` — Remove informações em admin.
- `GET /api/v1/admin/disciplinas/:id/conteudos` — Consulta informações em admin.
- `POST /api/v1/admin/disciplinas/:id/conteudos` — Cria ou executa ação em admin.
- `PATCH /api/v1/admin/disciplinas/:id/conteudos/:conteudoId` — Atualiza informações em admin.
- `DELETE /api/v1/admin/disciplinas/:id/conteudos/:conteudoId` — Remove informações em admin.

### disciplinas
Consulta de disciplinas e conteúdos.
Mock: `disciplinas.json`

- `GET /api/v1/disciplinas` — Consulta informações em disciplinas.
- `GET /api/v1/disciplinas/:id/conteudos` — Consulta informações em disciplinas.
- `GET /api/v1/disciplinas/:id` — Consulta informações em disciplinas.

### gaps
Consulta de lacunas de aprendizagem.
Mock: `gaps.json`

- `GET /api/v1/gaps` — Consulta informações em gaps.
- `GET /api/v1/gaps/historico` — Consulta informações em gaps.
- `GET /api/v1/gaps/:id` — Consulta informações em gaps.

### health
Verifica disponibilidade da API e conexão com banco de dados.
Mock: `health.json`

- `GET /api/v1/health` — Consulta informações em health.

### insights
Geração e consulta de recomendações e trabalhos de processamento.
Mock: `insights.json`

- `POST /api/v1/insights/gerar` — Cria ou executa ação em insights.
- `GET /api/v1/insights/jobs/:jobId` — Consulta informações em insights.
- `GET /api/v1/insights` — Consulta informações em insights.
- `GET /api/v1/insights/:id` — Consulta informações em insights.

## Como usar
Abra o JSON correspondente para simular dados no frontend. Para conferir os formatos reais de entrada e saída, consulte os controllers, DTOs, services e Swagger do backend. Rotas protegidas exigem autenticação JWT; operações admin podem exigir papel ADMIN.
