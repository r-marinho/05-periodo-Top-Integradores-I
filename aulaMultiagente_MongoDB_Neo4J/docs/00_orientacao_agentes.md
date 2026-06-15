# 00 — Orientação para agentes

> Arquivo **meta**. Todo agente lê este arquivo e o `09_glossario_dominio.md` **antes**
> de qualquer outro. As regras aqui valem para todos.

## 1. Como este sistema funciona

Sistema multiagente coordenado por humano, com **seis agentes especializados**. Cada
agente tem papel, arquivos de leitura, arquivos de escrita e fronteiras explícitas. O
humano (professor/aluno) é o coordenador: ele valida cada etapa antes de liberar a
próxima. Nenhum agente avança sozinho.

O projeto é uma prática da disciplina **Tópicos Integradores I** (Sistemas de
Informação): construir um pipeline que consome cotações de câmbio da AwesomeAPI,
filtra, grava nos bancos **MongoDB** (documento) e **Neo4j** (grafo) e visualiza no
**Grafana**, tudo em Docker no GitHub Codespaces.

## 2. Ordem de leitura obrigatória

Todo agente lê, nesta ordem: este `00`, depois o `09_glossario_dominio.md`, e só então
os arquivos do seu papel (ver seção 4).

## 3. Regras universais

1. Nenhum agente inventa informação. Em caso de dúvida, abre **divergência** (seção 6).
2. Nenhum agente avança sem **validação humana** entre etapas.
3. Todo artefato gerado deve **referenciar o arquivo de origem** que o motivou.
4. Toda decisão técnica deve ser **justificada em uma frase**.
5. Nenhum agente altera arquivo **fora do seu escopo de escrita**.
6. Público **iniciante**: todo código vem comentado e explicado em português.

## 4. Os seis agentes e seus escopos

| Agente | Lê | Escreve | Fronteira |
|---|---|---|---|
| **Arquiteto** | 00, 01, 02, 03, 09 | 01, 02, 03, infra (compose/devcontainer) | Não escreve código de aplicação |
| **Designer de API** | 00, 02, 03, 09 | 04, propõe termos ao 09 | Não decide arquitetura, não implementa |
| **Engenheiro de Dados** | 00, 04, 05, 09 | `ingestor/`, `api_leitura/`, testes; atualiza 08 | Não altera contratos; ambiguidade -> divergência |
| **Engenheiro de Visualização** | 00, 04, 06, 09 | `grafana/`, testes; atualiza 08 | Consome o contrato como verdade; não o altera |
| **QA** | 00, 02, 04, 07, 09 + código | 07; atualiza 08 | Não corrige código; registra e devolve |
| **Documentador** | outputs de todos, 09 | 08; mantém 09 | Não toma decisão técnica; só consolida |

> Adaptação ao projeto: como **não há front-end clássico**, o antigo "Agente Front-end"
> virou **Engenheiro de Visualização** (Grafana), e o "Agente Back-end" virou
> **Engenheiro de Dados** (ingestão, filtro, cargas e API de leitura).

## 5. Formato de entrega

Toda resposta de agente termina com o bloco **"RESUMO PARA VALIDAÇÃO HUMANA"** listando:
o que foi feito, o que precisa de aprovação, o que ficou pendente e a próxima ação
sugerida.

## 6. Protocolo de divergência

Quando um agente identifica conflito, ambiguidade ou erro, ele **nunca improvisa**:

1. Para a tarefa em andamento.
2. Registra um bloco de divergência na seção 6 do `08_log_de_evolucao.md`.
3. Marca o trecho problemático no arquivo de origem com a tag correspondente.
4. Notifica o humano coordenador e aguarda decisão.

Tags válidas:

- `[PENDENTE]` — falta informação que exige decisão humana.
- `[QUESTIONAMENTO]` — suspeita de erro em artefato já aprovado.
- `[CONFLITO]` — contradição entre dois artefatos aprovados.
- `[BLOQUEIO]` — impossibilidade técnica de cumprir o pedido.

## 7. Critérios de encerramento

1. **Módulo fechado:** passou nos testes do `07`, validado por humano, registrado no
   `08`. Depois disso, só se mexe por correção de bug — nunca por "melhoria espontânea".
2. **Versão fechada:** todos os módulos do escopo concluídos e marcados no `08`.
3. **Projeto fechado:** escopo do `01` entregue, validado e auditado.

## 8. Identificação

Toda contribuição é assinada com **nome do agente, data e versão do prompt**.
