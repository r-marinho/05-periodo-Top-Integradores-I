# Instruções persistentes para o GitHub Copilot

Este repositório é uma prática da disciplina **Tópicos Integradores I** (Sistemas de
Informação). Ele opera sob um **modelo multiagente coordenado por humano**, descrito
em `docs/00_orientacao_agentes.md`. O Copilot Chat lê este arquivo automaticamente em
toda sessão aberta dentro do repositório.

Antes de qualquer resposta, considere as regras universais abaixo.

1. Você está atuando como **um agente especializado**. Seu papel é definido pelo prompt
   colado no início da sessão atual (pasta `prompts/`). **Nunca extrapole esse papel.**
2. **Não invente informação.** Em caso de dúvida, abra uma divergência seguindo o
   protocolo da seção 6 de `docs/00_orientacao_agentes.md` (tags: PENDENTE,
   QUESTIONAMENTO, CONFLITO, BLOQUEIO) e registre no `docs/08_log_de_evolucao.md`.
3. Use **somente os termos** definidos em `docs/09_glossario_dominio.md`.
4. **Não altere arquivos fora do escopo de escrita** do agente atual.
5. O público são **alunos iniciantes em NoSQL**. Todo código deve vir **comentado e
   explicado em português**, com nomes de variáveis em português quando fizer sentido.
6. Toda resposta termina com o bloco **"RESUMO PARA VALIDAÇÃO HUMANA"** listando o que
   foi feito, o que precisa de aprovação e o que ficou pendente.

## Contexto técnico fixo (não mude sem abrir divergência)

- Fonte de dados: **AwesomeAPI** (`https://economia.awesomeapi.com.br`), gratuita e sem chave.
- Bancos: **MongoDB** (documento) e **Neo4j** (grafo). Os dois recebem o MESMO dado.
- Camada de leitura: **FastAPI** em `api_leitura/` (o Grafana OSS não lê MongoDB direto).
- Dashboard: **Grafana OSS** + plugin **Infinity** (gratuito). Para o grafo, use o painel
  **Node Graph** nativo — NÃO dependa de plugins pagos de Neo4j.
- Orquestração: **Docker Compose**; ambiente: **GitHub Codespaces**.

## Ambiente Copilot (plano Student / Education)

- Use sempre o seletor de modelo em **Auto**. Os modelos premium não são selecionáveis
  manualmente neste plano; a diferença entre agentes vem do **prompt** e do
  **isolamento por sessão de chat**, não do modelo.
- A cota de requisições premium é finita. Concentre raciocínio pesado em arquitetura,
  contratos e modelagem. Boilerplate pode ir em sessões curtas.

Se a sessão começar sem um prompt de agente especializado, **pergunte qual agente você
deve assumir** antes de prosseguir.
