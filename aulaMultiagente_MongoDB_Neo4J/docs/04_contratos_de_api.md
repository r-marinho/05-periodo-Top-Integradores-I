# 04 — Contrato da API de leitura

> A API de leitura (FastAPI, serviço `api_leitura`, porta 8000) é a **ponte** entre os
> bancos e o Grafana. O Grafana OSS não lê MongoDB de graça; então a API expõe tudo como
> JSON e o Grafana consome pelo plugin **Infinity**. Este contrato é a **verdade** para o
> Engenheiro de Dados (implementa) e o de Visualização (consome).

## 1. Padrão geral

- Base (dentro da rede do compose): `http://api_leitura:8000`
- Base (no navegador do Codespace): porta `8000` encaminhada.
- Respostas sempre em **JSON**, formato pensado para o Infinity (lista de objetos planos).
- Versionamento simples nesta fase (sem `/v1`); se evoluir, abrir divergência.

## 2. Endpoints

### 2.1 `GET /health`
Verificação de saúde. Resposta: `{ "status": "ok" }`.

### 2.2 `GET /mongo/serie?par=USD-BRL`
Série temporal de um par (para o painel de linha do tempo).

**Resposta (lista de pontos):**
```json
[
  { "coletado_em": "2026-06-15T13:00:00Z", "compra": 5.42, "venda": 5.43 },
  { "coletado_em": "2026-06-15T13:05:00Z", "compra": 5.41, "venda": 5.42 }
]
```

### 2.3 `GET /mongo/resumo`
Última cotação e variação de cada par (para os cards e a tabela).

**Resposta:**
```json
[
  { "par": "USD-BRL", "compra": 5.42, "venda": 5.43, "variacao_pct": -0.31,
    "maxima": 5.45, "minima": 5.40, "coletado_em": "2026-06-15T13:00:00Z" }
]
```

### 2.4 `GET /neo4j/grafo`
Nós e arestas do grafo de conversão, no formato do painel **Node Graph** do Grafana.

**Resposta:**
```json
{
  "nodes": [ { "id": "USD", "title": "USD" }, { "id": "BRL", "title": "BRL" } ],
  "edges": [ { "id": "USD-BRL", "source": "USD", "target": "BRL", "mainStat": 5.42 } ]
}
```

### 2.5 `GET /neo4j/caminho?de=BRL&para=JPY`
Melhor caminho de conversão entre duas moedas.

**Resposta:**
```json
{ "de": "BRL", "para": "JPY", "caminho": ["BRL", "USD", "JPY"], "saltos": 2 }
```

### 2.6 `GET /mongo/deadletter`
Cotações barradas pelo filtro (para demonstrar qualidade de dados em aula).

**Resposta:**
```json
[ { "motivo": "bid <= 0", "rejeitado_em": "2026-06-15T13:00:00Z", "bruto": { } } ]
```

## 3. Erros esperados

| Situação | HTTP | Corpo |
|---|---|---|
| Par não informado em `/mongo/serie` | 422 | `{ "detail": "par é obrigatório" }` |
| Par sem dados | 200 | `[]` (lista vazia, nunca erro) |
| Moeda inexistente em `/neo4j/caminho` | 404 | `{ "detail": "moeda não encontrada" }` |
| Banco indisponível | 503 | `{ "detail": "banco indisponível" }` |

## 4. Regras de contrato

- Datas sempre em UTC ISO-8601 com `Z`.
- Números como `float` (nunca string).
- Listas vazias em vez de `null` quando não há dados.
- Habilitar **CORS** liberado (o Grafana faz a chamada via proxy, mas facilita testes).

## 5. Pedido para o Agente Designer de API

Revise e complete este contrato, destacando qualquer ambiguidade que precise de decisão
antes da implementação. Garanta que cada endpoint tem exemplo **real** de resposta.
