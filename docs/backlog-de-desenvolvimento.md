# Mentor.ia — Backlog de Desenvolvimento Frontend & Integração (MVP)

Este backlog traduz as telas e fluxos validados do **Mentor.ia** em **Épicos, User Stories (US)** com critérios de aceite no formato **BDD / Gherkin**, priorização (**MoSCoW**) e complexidade técnica estimada em **Story Points (SP)**.

---

## 📊 Matriz de Priorização & Resumo

| Épico | Telas Relacionadas | Stories | Total SP | Prioridade |
| :--- | :--- | :---: | :---: | :---: |
| **EP01: Autenticação & Entrada** | Login (`SCREEN_60`), Cadastro (`SCREEN_58`) | 3 | 11 | **Must Have** |
| **EP02: Onboarding & Calibração** | Onboarding Rotina (`SCREEN_56`) | 2 | 8 | **Must Have** |
| **EP03: Motor de Avaliação (Quiz)** | Quiz Diagnóstico Adaptativo (`SCREEN_54`) | 3 | 16 | **Must Have** |
| **EP04: Gestão Cognitiva & Gaps** | Visão de Gaps (`SCREEN_52`) | 2 | 10 | **Must Have** |
| **EP05: IA Insights & Remediação** | Trilha & Insight da IA (`SCREEN_50`) | 2 | 13 | **Should Have** |

---

## 🚀 EP01: Autenticação & Acesso Rápido

### US01.1 — Autenticação do Estudante (Login Mobile)
- **Tela de Referência:** `Mentor.ia - Login Mobile` (e versão Dark)
- **Prioridade:** Must Have | **Estimativa:** 3 SP
- **Descrição:** Como vestibulanda cadastrada, quero inserir minhas credenciais para acessar diretamente meu painel de estudos sem atrito.
- **Critérios de Aceite:**
  - **Cenário 1 (Login com sucesso):**
    - *Dado* que estou na tela de Login e insiro um e-mail válido e senha correta;
    - *Quando* clico no botão "Entrar";
    - *Então* o sistema autentica a sessão via JWT/OAuth, armazena o token seguro no storage e redireciona imediatamente para o Dashboard (`5.1`).
  - **Cenário 2 (Credenciais inválidas):**
    - *Dado* que insiro dados incorretos;
    - *Quando* clico em "Entrar";
    - *Então* os inputs recebem estado de erro com mensagem de feedback contextual ("E-mail ou senha incorretos").
  - **Cenário 3 (Alternância de visibilidade da senha):**
    - *Dado* que estou digitando minha senha;
    - *Quando* toco no ícone de olho (toggle);
    - *Então* o campo alterna entre `type="password"` e `type="text"`.
  - **Cenário 4 (Navegação para Cadastro):**
    - *Dado* que toco em "Não tem conta? Crie aqui";
    - *Então* sou direcionada para o fluxo de Cadastro.

---

### US01.2 — Cadastro e Coleta de Perfil Inicial
- **Tela de Referência:** `Mentor.ia - Cadastro Mobile`
- **Prioridade:** Must Have | **Estimativa:** 5 SP
- **Descrição:** Como nova usuária, quero registrar meu nome, e-mail, senha e meta de estudos para gerar meu perfil de aprendizagem adaptativa.
- **Critérios de Aceite:**
  - **Cenário 1 (Formulário completo válido):**
    - *Dado* que preencho Nome, E-mail corporativo/pessoal, meta de estudos ("ENEM / Medicina"), senha (mínimo 6 caracteres) e confirmação de senha idêntica;
    - *E* marco o checkbox de concordância com Termos e Política;
    - *Quando* toco em "Criar conta";
    - *Então* a conta é instanciada na API e o aplicativo transiciona diretamente para a etapa 1 do Onboarding.
  - **Cenário 2 (Validação de força da senha em tempo real):**
    - *Dado* que digito uma senha fraca;
    - *Então* a barra indicadora de segurança deve exibir o status em cores (ex: Verde para senha forte/segura).

---

## 📅 EP02: Calibração de Rotina (Onboarding Adaptativo)

### US02.1 — Mapeamento de Dias Disponíveis
- **Tela de Referência:** `Mentor.ia - Onboarding Mobile` (Passo 2 de 4)
- **Prioridade:** Must Have | **Estimativa:** 5 SP
- **Descrição:** Como estudante com rotina concorrida, quero escolher os dias da semana em que consigo estudar para que a IA monte um cronograma sem sobrecarga.
- **Critérios de Aceite:**
  - **Cenário 1 (Seleção matricial de dias):**
    - *Dado* que estou na tela de dias disponíveis;
    - *Quando* toco nos botões de dias (SEG, TER, QUA, QUI, SEX, SAB, DOM);
    - *Então* cada item alterna entre selecionado (preenchimento azul primário `#1E40AF`) e inativo (cinza suave/outline).
  - **Cenário 2 (Cálculo adaptativo dinâmico):**
    - *Dado* que seleciono 5 dias úteis;
    - *Então* o card de recomendação inferior atualiza reativamente o texto: *"5 dias selecionados (~2h/dia recomendadas)"*.
  - **Cenário 3 (Avanço no fluxo):**
    - *Dado* que ao menos 1 dia está selecionado;
    - *Quando* clico em "Próximo passo";
    - *Então* as preferências são salvas localmente/no estado global e o usuário avança para a definição de tempo diário.

---

## 🎯 EP03: Motor de Avaliação & Quiz Diagnóstico

### US03.1 — Resolução Interativa de Questão Adaptativa
- **Tela de Referência:** `Mentor.ia - Quiz Diagnóstico Mobile`
- **Prioridade:** Must Have | **Estimativa:** 8 SP
- **Descrição:** Como vestibulanda, quero responder a questões do ENEM com interface limpa, diagramas técnicos e alternativas tocáveis para calibrar meu nível real.
- **Critérios de Aceite:**
  - **Cenário 1 (Seleção única de alternativa):**
    - *Dado* que visualizo uma questão com 4 alternativas (A, B, C, D);
    - *Quando* toco sobre a alternativa B;
    - *Então* apenas o card B fica com estado ativo (borda destacada, check icon ativo e background azul suave), desmarcando seleções anteriores.
  - **Cenário 2 (Barra de progresso e contadores):**
    - *Dado* que estou na questão 08 de 30;
    - *Então* a barra de progresso linear exibe 27% de preenchimento e o indicador contextual informa *"Matemática • Álgebra & Funções"*.
  - **Cenário 3 (Suporte a fórmulas e gráficos):**
    - *Dado* que a questão possui gráfico cartesiano ou relação matemática;
    - *Então* o container de renderização deve apresentar a imagem/gráfico vetorizado com alto contraste e legibilidade técnica sem overflow horizontal.

---

### US03.2 — Envio e Conclusão do Quiz
- **Tela de Referência:** `Mentor.ia - Quiz Diagnóstico Mobile`
- **Prioridade:** Must Have | **Estimativa:** 5 SP
- **Descrição:** Como usuária completando a última questão do diagnóstico, quero ver a transição do botão para "Ver meu Resultado" para acessar minha análise de lacunas cognitivas.
- **Critérios de Aceite:**
  - **Cenário 1 (Questão intermediária):**
    - *Dado* que o quiz está na questão 8/30;
    - *Então* o CTA principal deve exibir "Confirmar e Avançar".
  - **Cenário 2 (Última questão):**
    - *Dado* que o usuário alcançou a questão final (ex: 30/30 ou 20/20);
    - *Então* o CTA principal muda dinamicamente para "Ver meu Resultado", disparando o cálculo do algoritmo de TRI e abrindo a tela de Visão de Gaps / Dashboard.

---

## 🔍 EP04: Diagnóstico e Visualização de Gaps

### US04.1 — Painel Analítico de Lacunas Cognitivas
- **Tela de Referência:** `Mentor.ia - Diagnóstico de Gaps Mobile`
- **Prioridade:** Must Have | **Estimativa:** 5 SP
- **Descrição:** Como estudante, quero visualizar minhas matérias ordenadas por prioridade de risco (vermelho, amarelo, verde) para saber exatamente onde focar meus estudos.
- **Critérios de Aceite:**
  - **Cenário 1 (Cores semânticas de severidade):**
    - *Dado* que a API retorna as porcentagens de domínio por matéria;
    - *Então* disciplinas com nota < 50% (ex: Matemática - 42%) recebem tag Vermelha "Crítica" e barra de progresso vermelha;
    - *E* disciplinas entre 50% e 70% (Física - 55%, Linguagens - 67%) recebem tag Laranja/Amarela "Alta/Média";
    - *E* disciplinas > 70% (História - 82%) recebem tag Verde "Baixa/Consolidada".
  - **Cenário 2 (Detalhamento de micro-conteúdos):**
    - *Dado* que visualizo o card de Matemática;
    - *Então* a lista exibe os tópicos específicos mapeados como causadores do gap (Funções, Porcentagem & Juros, Probabilidade Condicional).
  - **Cenário 3 (Ação de aprofundamento):**
    - *Dado* que toco em "Estudar tópico prioritário" ou "Ver detalhes";
    - *Então* sou direcionada para o Insight específico daquele gap (`SCREEN_50`).

---

## 💡 EP05: Inteligência Artificial & Trilha de Remediação

### US05.1 — Diagnóstico de Causa Raiz e Projeção de Ganho
- **Tela de Referência:** `Mentor.ia - Insight da IA Mobile`
- **Prioridade:** Should Have | **Estimativa:** 5 SP
- **Descrição:** Como vestibulanda travada em uma matéria, quero entender a razão exata do meu erro (ex: física bloqueada por matemática básica) e quanto posso evoluir.
- **Critérios de Aceite:**
  - **Cenário 1 (Exibição do insight diagnótico):**
    - *Dado* que abro a tela de Insight da IA;
    - *Então* o card superior exibe o texto explicativo contextualizado ("O domínio de Matemática Básica está bloqueando seu avanço em Física Mecânica").
  - **Cenário 2 (Gráfico preditivo de impacto):**
    - *Dado* que a estimativa da IA prevê +18% de acertos;
    - *Então* o componente gráfico deve renderizar a curva comparativa ("Ritmo atual" vs "Com trilha adaptativa").

---

### US05.2 — Trilha Adaptativa Sequencial em Micro-Passos
- **Tela de Referência:** `Mentor.ia - Insight da IA Mobile`
- **Prioridade:** Should Have | **Estimativa:** 8 SP
- **Descrição:** Como estudante com pouco tempo livre, quero uma trilha rápida dividida em 3 passos (Revisão, Exercícios e Micro-quiz) com tempo estimado para resolver o gap em 15 minutos.
- **Critérios de Aceite:**
  - **Cenário 1 (Passos estruturados e estimativa):**
    - *Dado* que a trilha é carregada;
    - *Então* exibe:
      - Passo 1: Revisão Conceitual Rápida (3 min);
      - Passo 2: Resolução Passo a Passo (4 questões com dicas);
      - Passo 3: Micro-Quiz de Consolidação (2 questões).
  - **Cenário 2 (Ação primária de início):**
    - *Dado* que toco no CTA "Iniciar Trilha Adaptativa Agora";
    - *Então* o app abre o reprodutor da micro-revisão (Passo 1) em modo foco.
  - **Cenário 3 (Ação secundária):**
    - *Dado* que toco em "Adicionar ao meu Cronograma";
    - *Então* a sessão é agendada para o próximo dia livre e um toast de confirmação é exibido.

---

## 🛠️ Requisitos Não-Funcionais & Definição de Pronto (DoD)

1. **Design System Fidelity:**
   - Estrita conformidade com a paleta secundária sóbria **Sovereign Blue (`#1E40AF`)**, superfícies claras em `#FAFAFA`/`#FFFFFF` e raio de curvatura consistente (`rounded-xl` / `rounded-2xl`).
2. **Performance:**
   - First Contentful Paint (FCP) < 1.2s em rede móvel 4G.
   - Transições de tela via rotas SPA sem recarregamento completo da página.
3. **Acessibilidade (WCAG 2.1 AA):**
   - Taxa de contraste mínima de 4.5:1 para todos os textos sobre fundos claros ou azuis escuros.
   - Áreas de toque mínimas de 44x44px para botões e cards de alternativas no mobile.
4. **Testes:**
   - Cobertura de testes unitários para o cálculo dos gaps e validações de formulário (> 80%).
