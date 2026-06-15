# 01 — Visão geral do sistema

## 1. Objetivo do projeto

Construir, com o apoio de agentes de IA, um **pipeline de dados de câmbio** que mostre a
alunos iniciantes que **o mesmo dado** pode ser modelado de duas formas radicalmente
diferentes — **documento** (MongoDB) e **grafo** (Neo4j) — e que cada modelo responde
melhor a perguntas diferentes.

## 2. Problema que o sistema resolve

Iniciantes em NoSQL costumam decorar "Mongo é documento, Neo4j é grafo" sem **sentir** a
diferença. Aqui, a mesma cotação (`USD-BRL`) vira um **documento de histórico** no Mongo
e uma **aresta de conversão** no Neo4j, sem nenhuma ginástica. O contraste fica visível,
inclusive no dashboard.

## 3. Atores envolvidos

- **Aluno/operador:** abre o Codespace, conduz os agentes, valida etapas e apresenta.
- **Professor:** coordena, valida e usa o resultado em aula.
- **Consumidor dos dados:** o Grafana (via API de leitura).

## 4. Escopo — dentro e fora

**Dentro:**
- Coleta da AwesomeAPI (último valor + histórico diário).
- Filtro de qualidade com coleção *dead-letter*.
- Gravação simultânea em MongoDB e Neo4j.
- API de leitura (FastAPI) expondo os dois bancos como JSON.
- Dashboard no Grafana (séries, cards, tabela e grafo).
- Tudo em Docker Compose, rodando no GitHub Codespaces.

**Fora desta fase:**
- Autenticação de usuários no dashboard.
- Front-end web/mobile próprio (o "front" é o Grafana).
- Cálculo financeiro real / decisão de investimento.
- Deploy em nuvem de produção.

## 5. Restrições técnicas (não violar sem divergência)

- Linguagem da aplicação: **Python 3.12**.
- Bancos: **MongoDB 7** e **Neo4j 5**.
- API de leitura: **FastAPI + Uvicorn**.
- Dashboard: **Grafana OSS** + plugin **Infinity** (gratuito). Grafo via **Node Graph**.
- Orquestração: **Docker Compose**; ambiente: **GitHub Codespaces**.
- Ferramenta de IA: **GitHub Copilot** em modo **Auto** (plano Student).

## 6. Premissas

- A AwesomeAPI é gratuita e não exige chave para uso básico.
- O Grafana OSS **não** lê MongoDB nativamente de graça -> por isso existe a API de leitura.
- O público é iniciante: clareza didática vale mais que sofisticação.

## 7. Riscos conhecidos

| Risco | Mitigação |
|---|---|
| AwesomeAPI fora do ar / limite de requisições | Ingestor trata timeout e segue no próximo ciclo |
| Cota do Copilot Student acabar no meio | Disciplina de uso (ver `00` e README) |
| Cota de horas do Codespaces | Desligar o Codespace ao fim de cada sessão |
| Container não sobe por porta ocupada | Conferir portas 3000/7474/7687/8000 |

## 8. Pedido para o Agente Arquiteto

Atue como arquiteto. Analise este cenário e proponha/valide a estrutura inicial
(módulos, dependências, fluxo de dados e infra Docker), preenchendo os arquivos `02` e
`03` e ajustando a infra se necessário. Liste premissas e riscos antes de decidir.
