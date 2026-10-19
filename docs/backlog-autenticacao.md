# Backlog de Autenticacao Mentor IA

Este backlog iniciou pela consolidacao da autenticacao entre o Frontend e o Backend do Mentor IA. A autenticacao esta concluida; as fases seguintes organizam a integracao do onboarding, da area principal e dos prototipos visuais ainda sem API.

## Objetivo

Permitir cadastro, login, sessao persistida, logout e acesso protegido a rotas privadas por meio da API em `/api/v1/auth`.

## Itens de trabalho

- [x] Confirmar os contratos de cadastro, login, logout e perfil expostos pelo Backend.
- [x] Manter tipos unicos para a resposta de autenticacao e para o usuario autenticado no Frontend.
- [x] Conectar o formulario de cadastro existente a `POST /auth/register`.
- [x] Conectar o formulario de login existente a `POST /auth/login`.
- [x] Persistir access token, refresh token e dados do aluno apos autenticacao bem-sucedida.
- [x] Reidratar a sessao ao acessar rotas privadas e redirecionar visitantes para `/login`.
- [x] Enviar o access token como Bearer nas chamadas autenticadas.
- [x] Limpar sessao e tokens locais no logout, mesmo se a chamada a API falhar.
- [x] Remover referencias ativas ao mock de autenticacao.
- [x] Configurar CORS do Backend para as origens autorizadas do Frontend.
- [x] Validar os builds de Frontend e Backend antes do commit tematico.

## Criterios de aceite

- Uma pessoa consegue criar uma conta e segue para o onboarding ja autenticada.
- Uma pessoa cadastrada consegue entrar e acessar rotas privadas.
- Credenciais invalidas e e-mail ja cadastrado exibem a mensagem retornada pela API.
- Ao recarregar uma rota privada, a sessao armazenada permanece disponivel.
- Sem sessao valida, a navegacao segue para `/login`.
- O logout remove tokens e dados da sessao no navegador.
- Frontend e Backend compilam sem erros.

## Fase 2 Onboarding e disponibilidade

### Objetivo

Conectar a coleta de dias e tempo de estudo a disponibilidade persistida do aluno.

### Itens de trabalho

- [x] Ler a disponibilidade existente por `GET /alunos/me/disponibilidade` ao entrar no onboarding.
- [x] Adaptar os dias e minutos informados pela interface ao contrato de disponibilidade da API.
- [x] Salvar as alteracoes por `PUT /alunos/me/disponibilidade`.
- [x] Exibir carregamento durante a leitura e o salvamento.
- [x] Exibir mensagem de erro recuperavel quando a API nao aceitar ou nao responder a solicitacao.
- [x] Exibir confirmacao apos salvar a disponibilidade.

### Criterios de aceite

- Uma pessoa autenticada visualiza a disponibilidade ja salva ao retornar ao onboarding.
- Dias e tempo de estudo salvos pela interface permanecem disponiveis apos recarregar a pagina.
- Erros e carregamentos sao compreensiveis e nao descartam a escolha feita pela pessoa.

## Fase 3 Area principal com dados reais

### Objetivo

Substituir dados temporarios por dados reais de desempenho, gaps, disciplinas e conteudos onde houver API disponivel.

### Itens de trabalho

- [ ] Consumir `/dashboard/:visao` na area principal e apresentar os dados retornados pelo Backend.
- [ ] Consumir `/gaps` e exibir prioridades e estados sem dados.
- [ ] Exibir um estado vazio claro para pessoas que ainda nao concluiram o diagnostico.
- [ ] Consumir `/disciplinas` na listagem de disciplinas.
- [ ] Consumir `/disciplinas/:id/conteudos` no detalhamento de conteudos.
- [ ] Padronizar carregamento, erro e estado vazio nas telas conectadas.

### Criterios de aceite

- A area principal mostra dados reais quando a API os disponibiliza.
- Quem ainda nao possui diagnostico ve orientacao clara em vez de dados simulados.
- A navegacao entre disciplinas e conteudos usa os identificadores e contratos do Backend.

## Fase 4 Diagnostico e cronograma como prototipos visuais

### Objetivo

Manter navegaveis as telas cujo contrato de persistencia ainda nao existe, sem apresentar dados temporarios como se fossem dados reais.

### Itens de trabalho

- [ ] Manter as telas de diagnostico e cronograma acessiveis pela navegacao.
- [ ] Identificar visualmente conteudos de demonstracao e impedir confirmacoes de persistencia inexistente.
- [ ] Isolar dados temporarios dentro das respectivas features para futura substituicao pelos contratos de API.
- [ ] Evitar regras de negocio no Frontend que antecipem a implementacao do Backend.

### Criterios de aceite

- As telas continuam demonstraveis e navegaveis.
- Nenhuma acao visual sugere que diagnostico ou cronograma foi salvo quando nao existe endpoint para isso.
- A substituicao por APIs futuras fica localizada nas features de diagnostico e cronograma.

## Fora do escopo atual

- Recuperacao e redefinicao de senha.
- Renovacao automatica via refresh token.
- Alteracao de perfil e telas administrativas.
- Provisionamento de infraestrutura e dados iniciais.

## Ordem de execucao

1. Contratos e tipos.
2. Cadastro e login.
3. Sessao, protecao de rotas e logout.
4. CORS e tratamento de erros.
5. Validacao de build e commit tematico.
6. Fase 2: Onboarding e disponibilidade.
7. Fase 3: Area principal com dados reais.
8. Fase 4: Diagnostico e cronograma como prototipos visuais.
