# 05 — Módulo de Dados (ingestão, filtro, cargas e API de leitura)

> Responsável: **Agente Engenheiro de Dados**. Substitui os esqueletos em `ingestor/` e
> `api_leitura/` pelo código real, seguindo o contrato `04` e a modelagem `03`.

## 1. Contexto do módulo

Este módulo cobre todo o back-end de dados:
1. coletar da AwesomeAPI,
2. filtrar (regras de negócio da seção 3 do `02`),
3. gravar no Mongo e no Neo4j,
4. expor pela API de leitura.

## 2. Requisitos técnicos

- Python 3.12; libs já fixadas em `ingestor/requirements.txt` e `api_leitura/requirements.txt`.
- Variáveis de ambiente vêm do compose (MONGO_URI, NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD,
  PARES, INTERVALO_SEGUNDOS).
- Código comentado em português, para iniciantes.

## 3. Arquivos a gerar em `ingestor/`

- `main.py` — laço principal: a cada `INTERVALO_SEGUNDOS`, busca os pares de `PARES`,
  trata timeout/erro de rede (não derrubar o serviço), e encaminha cada cotação ao filtro.
- `filtros.py` — modelo `pydantic` `Cotacao` + função `validar(bruto) -> (ok, motivo)`
  implementando RN01–RN05. Inválidos vão para a *dead-letter*, nunca para os bancos.
- `carga_mongo.py` — `pymongo`; coleção `cotacoes` com índice `(par, coletado_em)`;
  insere um documento por cotação válida; grava rejeições em `dead_letter`.
- `carga_neo4j.py` — driver `neo4j`; `MERGE` de moedas e da aresta `:CONVERTE` (Cypher do `03`).

## 4. Arquivos a gerar em `api_leitura/`

- `main.py` — FastAPI implementando **todos** os endpoints do `04`. Conecta em Mongo e
  Neo4j usando as mesmas variáveis de ambiente. CORS liberado.

## 5. Testes obrigatórios (entregar junto)

- `ingestor/test_filtros.py` — para cada regra RN01–RN05: um caso que passa e um que barra.
- Teste de conversão de tipos (string da API -> float; data -> UTC).
- Teste de integração leve da API: `GET /health` responde 200; `/mongo/serie` sem `par`
  responde 422; com dados retorna lista de pontos.

## 6. Critérios de aceite

- `docker compose up --build` mantém o ingestor coletando em loop sem cair.
- Após 1 ciclo: `cotacoes` tem documentos e o Neo4j tem nós/arestas dos mesmos pares.
- Uma cotação ruim (ex.: `bid=0`) aparece na `dead_letter` com o motivo.
- Todos os endpoints do `04` respondem conforme os exemplos.
- Testes da seção 5 passam (`pytest`).

## 7. Pedido para o Agente Engenheiro de Dados

Gere o código completo dos dois serviços + os testes, seguindo **estritamente** o
contrato `04` e a modelagem `03`. Ambiguidade -> abra divergência, não improvise. Ao
final, registre no `08` e inclua o bloco EVIDÊNCIAS com a saída dos testes.
