# 06 — Módulo de Visualização (Grafana)

> Responsável: **Agente Engenheiro de Visualização**. Substitui o dashboard inicial em
> `grafana/provisioning/dashboards/cambio.json` pelos painéis reais. Consome a API de
> leitura (`04`) como **verdade** — não altera o contrato.

## 1. Contexto do módulo

Montar um dashboard que mostre, lado a lado, o que cada banco faz melhor: série temporal
(Mongo) e grafo de conversão (Neo4j). Tudo provisionado por arquivo — abrir a porta 3000
já deve mostrar o dashboard populado, sem clique manual.

## 2. Contrato consumido

Datasource **Infinity** (já provisionado em `grafana/provisioning/datasources/datasources.yml`).
Cada painel chama uma URL da API, ex.: `http://api_leitura:8000/mongo/serie?par=USD-BRL`.

## 3. Painéis a gerar

1. **Série temporal (Time series)** — linha de compra/venda por par, usando `/mongo/serie`.
   Variável de dashboard `par` para o usuário trocar a moeda.
2. **Cards (Stat)** — cotação atual e variação % por par, usando `/mongo/resumo`.
3. **Tabela (Table)** — todos os pares com compra/venda/máxima/mínima, de `/mongo/resumo`.
4. **Grafo (Node Graph)** — nós-moeda e arestas de conversão, de `/neo4j/grafo`.
5. (Opcional) **Tabela de dead-letter** — de `/mongo/deadletter`, para discutir qualidade.

## 4. Experiência esperada

- Dashboard provisionado automaticamente (não pode exigir login nem importação manual).
- Estado vazio tratado: se um endpoint retornar `[]`, o painel mostra "sem dados", não erro.
- Título e descrição em português em cada painel.

## 5. Testes obrigatórios (validação manual documentada)

- Abrir porta 3000 -> dashboard "Câmbio NoSQL" aparece sem login.
- Cada painel carrega dados reais da API (print/observação no `08`).
- Trocar a variável `par` muda a série temporal.
- Node Graph mostra os nós-moeda conectados.

## 6. Critérios de aceite

- Os 4 painéis principais sobem populados após o ingestor rodar ao menos 1 ciclo.
- Nenhum painel depende de plugin pago.

## 7. Pedido para o Agente Engenheiro de Visualização

Gere o `cambio.json` completo (JSON de dashboard do Grafana) com os painéis acima
apontando para os endpoints do `04` via Infinity. Documente no `08` a validação manual.
Se algum endpoint não entregar o formato esperado, abra QUESTIONAMENTO — não mude a API.
