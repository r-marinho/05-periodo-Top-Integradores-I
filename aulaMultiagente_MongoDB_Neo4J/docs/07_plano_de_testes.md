# 07 — Plano de testes

> Responsável por manter: **Agente de QA**. Em projetos com IA, testar desde cedo evita
> que "parece pronto" vire "não funciona em aula".

## 1. Objetivo

Definir como cada etapa é validada e o que precisa estar verde antes de fechar um módulo.

## 2. Testes de arquitetura/infra

- `docker compose config` valida o YAML sem erro.
- `docker compose up --build` sobe os 5 serviços; healthchecks de mongo e neo4j ficam *healthy*.
- Dados persistem após `docker compose restart` (volumes nomeados).

## 3. Testes do módulo de dados (`05`)

- **Unitários do filtro:** RN01–RN05, cada uma com um caso que passa e um que barra.
- **Conversão de tipos:** string->float e data->UTC.
- **Integração de carga:** após 1 ciclo, `cotacoes` tem documentos e o Neo4j tem
  nós/arestas dos mesmos pares; uma cotação ruim aparece na `dead_letter`.
- **API:** `/health`=200; `/mongo/serie` sem `par`=422; com dados retorna lista; demais
  endpoints conforme exemplos do `04`.

## 4. Testes do módulo de visualização (`06`)

- Dashboard sobe provisionado, sem login, na porta 3000.
- Cada painel carrega dados reais (validação manual com evidência no `08`).
- Variável `par` troca a série; Node Graph mostra as moedas conectadas.

## 5. Critérios de aprovação

Um módulo só é "fechado" quando: todos os testes da sua seção passam, há evidência
registrada no `08`, e o humano validou. Sem subjetividade.

## 6. Evidências

Registrar no `08`: comando executado, saída do `pytest`, prints do Grafana e do Neo4j
Browser, e data/validador.

## 7. Pedido para o Agente de QA

Organize os testes por prioridade, execute o que for automatizável, e para cada falha
registre **passo a passo de reprodução** e severidade. Você não corrige código — devolve
ao agente responsável.
