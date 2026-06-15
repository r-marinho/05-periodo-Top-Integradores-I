# 02 — Requisitos e regras de negócio

## 1. Requisitos funcionais

- **RF01** — Coletar cotações da AwesomeAPI para os pares definidos em `PARES`.
- **RF02** — Coletar o **último valor** (`/json/last/...`) e o **histórico diário**
  (`/json/daily/PAR/N`) de cada par.
- **RF03** — Aplicar um **filtro de qualidade** antes de gravar (ver seção 3).
- **RF04** — Gravar cada cotação válida no **MongoDB** como documento de histórico.
- **RF05** — Gravar a mesma cotação no **Neo4j** como aresta de conversão entre moedas.
- **RF06** — Registrar cotações rejeitadas em uma coleção **dead-letter** (com o motivo).
- **RF07** — Expor os dados via **API de leitura** (FastAPI) em JSON (ver `04`).
- **RF08** — Exibir os dados no **Grafana** (séries, cards, tabela e grafo).
- **RF09** — Repetir a coleta a cada `INTERVALO_SEGUNDOS`.

## 2. Requisitos não funcionais

- **RNF01 — Reprodutibilidade:** `docker compose up --build` sobe tudo num Codespace limpo.
- **RNF02 — Didática:** todo código comentado e explicado em português, para iniciantes.
- **RNF03 — Resiliência:** falha de rede na API não derruba o ingestor; ele tenta de novo.
- **RNF04 — Persistência:** dados sobrevivem a reinício dos containers (volumes nomeados).
- **RNF05 — Custo zero:** nenhuma ferramenta paga (sem Grafana Enterprise, sem chave de API).
- **RNF06 — Verificabilidade:** cada módulo tem testes (ver `07`).

## 3. Regras de negócio (o "FILTRO")

| ID | Regra | Por que existe | Exemplo do que barra |
|---|---|---|---|
| **RN01** | `bid` (compra) presente e > 0 | dado financeiro sem preço é inútil | cotação vazia da API |
| **RN02** | variação `pctChange` dentro de um limite (ex.: ≤ 50% por tick) | tick com erro grosseiro polui o gráfico | dólar a R$ 0,01 ou R$ 9.999 |
| **RN03** | sem duplicata (mesmo `par` + mesmo `timestamp`) | evita inflar contagens | mesma coleta gravada 2x |
| **RN04** | código de moeda normalizado em MAIÚSCULAS | consistência da chave no grafo | "usd" vs "USD" |
| **RN05** | `maxima >= minima` | sanidade da faixa do dia | dados invertidos |

Cotações que violam qualquer regra **não** são gravadas nos bancos principais; vão para
a coleção *dead-letter* com o motivo da rejeição.

## 4. Casos de uso prioritários

1. **UC01** — "Como o dólar variou nos últimos 30 dias?" -> consulta de série no MongoDB.
2. **UC02** — "Qual a melhor sequência de conversões de BRL até JPY?" -> caminho no Neo4j.
3. **UC03** — "O que o filtro barrou hoje e por quê?" -> consulta à *dead-letter*.

## 5. Critérios de aceite (gerais)

- O ingestor coleta e o filtro comprovadamente barra um dado ruim (mostrável em aula).
- O Mongo tem documentos; o Neo4j tem nós e arestas para os mesmos pares.
- A API de leitura responde JSON válido nos endpoints do `04`.
- O Grafana abre na porta 3000 **já com dashboard populado**, sem clique manual.

## 6. Dependências entre requisitos

RF04/RF05 dependem de RF03 (filtro). RF07 depende de RF04/RF05. RF08 depende de RF07.

## 7. Pedido para o Agente Arquiteto

Organize estes requisitos, aponte inconsistências e indique lacunas que precisam de
decisão **antes** do desenvolvimento começar.
