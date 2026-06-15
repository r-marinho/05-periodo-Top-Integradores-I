# 09 — Glossário de domínio

> Dicionário compartilhado. Evita que os agentes usem termos diferentes para a mesma
> coisa. Mantido pelo **Agente Documentador**; termo novo só entra após validação humana.

## 1. Termos do negócio

| Termo | Definição | Sinônimos proibidos |
|---|---|---|
| **Par** | Combinação `ORIGEM-DESTINO`, ex.: `USD-BRL` | "moeda dupla", "ticker" |
| **Cotação** | Valor de um par num instante (compra/venda/máx/mín) | "preço", "valor" (sozinhos) |
| **Compra (`bid`)** | Preço de compra informado pela API | "bid" no código de aluno |
| **Venda (`ask`)** | Preço de venda informado pela API | "ask" no código de aluno |
| **Variação (`pctChange`)** | Variação percentual do dia | "delta" |
| **Conversão** | Relação de troca entre duas moedas (aresta no grafo) | "câmbio" (ambíguo) |
| **Dead-letter** | Coleção das cotações rejeitadas pelo filtro | "lixo", "erro" |

## 2. Termos técnicos

| Termo | Definição |
|---|---|
| **Documento** | Unidade de dado no MongoDB (JSON), aqui uma cotação |
| **Nó / Aresta** | Unidades do grafo no Neo4j (Moeda / CONVERTE) |
| **MERGE** | Comando Cypher que cria se não existir, evitando duplicar |
| **Ingestor** | Serviço que coleta, filtra e grava |
| **API de leitura** | FastAPI que expõe os bancos como JSON para o Grafana |
| **Infinity** | Plugin gratuito do Grafana que lê JSON de uma URL HTTP |
| **Node Graph** | Painel nativo do Grafana que desenha grafos |
| **Dead-letter** | (ver seção 1) padrão de "fila de rejeitados" |

## 3. Convenções de nomenclatura

- Pares: `ORIGEM-DESTINO` em MAIÚSCULAS (`USD-BRL`).
- Campos no Mongo em português: `par`, `compra`, `venda`, `maxima`, `minima`,
  `variacao_pct`, `coletado_em`.
- Coleções: `cotacoes`, `dead_letter`.
- Nós/arestas no Neo4j: `(:Moeda {codigo})`, `[:CONVERTE {taxa, atualizado_em}]`.
- Serviços do compose: `mongo`, `neo4j`, `ingestor`, `api_leitura`, `grafana`.

## 4. Termos ambíguos resolvidos

| Termo | Decisão |
|---|---|
| "câmbio" | Usar **conversão** para a relação no grafo e **cotação** para o valor no tempo |

## 5. Pedido para o Agente Documentador

Mantenha este arquivo consistente. Toda nova definição passa por validação humana antes
de entrar.
