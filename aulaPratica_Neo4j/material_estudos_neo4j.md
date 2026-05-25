# Material de Estudos: Neo4j e Banco de Dados Grafos

**Disciplina:** Tópicos Integradores I  
**Ferramenta:** Neo4j Desktop + Neo4j Browser (`http://localhost:7474`)

---

## Sumário

1. [O que são Bancos de Dados Grafos?](#módulo-1-o-que-são-bancos-de-dados-grafos)
2. [Fundamentos do Neo4j](#módulo-2-fundamentos-do-neo4j)
3. [Linguagem Cypher](#módulo-3-linguagem-cypher)
4. [Prática Guiada — Rede Social](#módulo-4-prática-guiada--rede-social)
5. [Prática Guiada — Sistema de Filmes](#módulo-5-prática-guiada--sistema-de-filmes)
6. [Exercícios Propostos](#módulo-6-exercícios-propostos)

---

## Módulo 1: O que são Bancos de Dados Grafos?

### 1.1 Motivação

Imagine que você precisa modelar uma rede social onde usuários se seguem, curtem publicações e pertencem a grupos. Em um banco relacional, isso exige diversas tabelas intermediárias (junction tables) e JOINs que ficam lentos à medida que os dados crescem.

Bancos de dados grafos resolvem esse problema armazenando os dados **exatamente como as conexões existem na vida real**: como nós ligados por relacionamentos.

### 1.2 Comparação: Relacional vs. Grafo

| Conceito Relacional | Conceito em Grafo |
|---|---|
| Tabela | Label (rótulo de nó) |
| Linha | Nó (Node) |
| Coluna | Propriedade (Property) |
| Foreign Key / JOIN | Relacionamento (Relationship) |
| Tabela de junção | Relacionamento direto |

**Exemplo visual:**

Banco relacional (3 tabelas + JOIN):
```
USUARIO(id, nome)
PRODUTO(id, nome)
COMPROU(usuario_id, produto_id, data)
```

Banco de grafos (direto e intuitivo):
```
(:Usuario {nome: "Ana"}) -[:COMPROU {data: "2024-01"}]-> (:Produto {nome: "Livro"})
```

### 1.3 Quando usar um banco de dados grafo?

Use Neo4j quando o problema envolve **relacionamentos profundos e complexos**:

- Redes sociais (quem conhece quem, grau de separação)
- Sistemas de recomendação ("quem comprou X também comprou Y")
- Detecção de fraude (identificar padrões suspeitos de transações)
- Grafos de conhecimento (como o Google Knowledge Graph)
- Roteamento e logística (caminhos mínimos, rotas)
- Gestão de dependências (bibliotecas de software, supply chain)

### 1.4 Neo4j no mercado

O Neo4j é o banco de dados grafo mais utilizado no mundo. É usado por:
- NASA (gestão de missões)
- eBay (detecção de fraude)
- LinkedIn (rede de conexões)
- Airbus (cadeia de fornecedores)

---

## Módulo 2: Fundamentos do Neo4j

O Neo4j usa o modelo **Property Graph** (Grafo de Propriedades), composto por quatro elementos fundamentais.

### 2.1 Nós (Nodes)

Nós representam **entidades** — as "coisas" do seu domínio.

```
( )           ← nó vazio (representação visual)
(:Pessoa)     ← nó com rótulo "Pessoa"
(:Pessoa {nome: "Ana", idade: 30})  ← nó com rótulo e propriedades
```

- Todo nó tem um **ID interno** gerado automaticamente pelo Neo4j
- Um nó pode ter **zero ou mais rótulos**
- Um nó pode ter **zero ou mais propriedades** (pares chave:valor)

### 2.2 Relacionamentos (Relationships)

Relacionamentos conectam dois nós e representam **ações ou associações** entre entidades.

```
(:Pessoa)-[:CONHECE]->(:Pessoa)
(:Pessoa)-[:COMPROU {data: "2024-01"}]->(:Produto)
```

**Regras importantes:**
- Todo relacionamento tem um **tipo** (escrito em MAIÚSCULAS por convenção)
- Todo relacionamento tem uma **direção** (de um nó para outro)
- Relacionamentos também podem ter **propriedades**
- Um relacionamento sempre tem um nó de **início** e um nó de **fim**

### 2.3 Propriedades (Properties)

Propriedades são pares `chave: valor` que descrevem nós ou relacionamentos.

```cypher
{
  nome: "Ana",
  idade: 30,
  ativo: true,
  notas: [9.0, 8.5, 10.0]
}
```

Tipos suportados:
- String: `"texto"`
- Integer: `42`
- Float: `3.14`
- Boolean: `true` / `false`
- Lista: `[1, 2, 3]` ou `["a", "b"]`
- Date/DateTime: `date("2024-01-15")`

### 2.4 Rótulos (Labels)

Rótulos categorizam os nós. Um nó pode ter múltiplos rótulos.

```cypher
(:Pessoa)
(:Pessoa:Funcionario)       ← dois rótulos
(:Produto:Eletronico)       ← dois rótulos
```

Por convenção, rótulos são escritos em **PascalCase**.

### 2.5 Resumo Visual do Modelo

```
                    [:TRABALHA_EM {desde: 2020}]
(:Pessoa            )─────────────────────────────▶(:Empresa          )
  nome: "Carlos"                                     nome: "TechCorp"
  idade: 28                                          setor: "TI"

         │
         │ [:CONHECE]
         ▼
(:Pessoa            )
  nome: "Ana"
  idade: 30
```

---

## Módulo 3: Linguagem Cypher

O Cypher é a linguagem de consulta do Neo4j. Sua sintaxe foi inspirada em **ASCII art** — o código parece um desenho do grafo que você quer criar ou consultar.

### 3.1 Estrutura básica

```cypher
MATCH  (padrão de busca)
WHERE  (condições)
RETURN (o que retornar)
```

### 3.2 CREATE — Criando nós e relacionamentos

**Criar um nó simples:**
```cypher
CREATE (:Pessoa {nome: "Ana", idade: 30})
```

**Criar dois nós e um relacionamento em uma única instrução:**
```cypher
CREATE (:Pessoa {nome: "Ana"})-[:CONHECE]->(:Pessoa {nome: "Bruno"})
```

**Criar um nó e guardar referência em variável:**
```cypher
CREATE (p:Pessoa {nome: "Carlos", idade: 28})
RETURN p
```

> **Dica:** Variáveis no Cypher são letras minúsculas antes do rótulo. `(p:Pessoa)` — `p` é a variável, `Pessoa` é o rótulo.

### 3.3 MATCH — Consultando dados

**Buscar todos os nós com um rótulo:**
```cypher
MATCH (p:Pessoa)
RETURN p
```

**Buscar nó com condição:**
```cypher
MATCH (p:Pessoa)
WHERE p.nome = "Ana"
RETURN p
```

**Forma abreviada (equivalente ao acima):**
```cypher
MATCH (p:Pessoa {nome: "Ana"})
RETURN p
```

**Buscar com relacionamento:**
```cypher
MATCH (a:Pessoa)-[:CONHECE]->(b:Pessoa)
RETURN a.nome, b.nome
```

**Buscar ignorando direção do relacionamento:**
```cypher
MATCH (a:Pessoa)-[:CONHECE]-(b:Pessoa)
RETURN a.nome, b.nome
```

### 3.4 WHERE — Filtrando resultados

```cypher
-- Comparação
MATCH (p:Pessoa)
WHERE p.idade > 25
RETURN p.nome, p.idade

-- AND / OR
MATCH (p:Pessoa)
WHERE p.idade >= 18 AND p.cidade = "Patos de Minas"
RETURN p

-- CONTAINS (busca em string)
MATCH (p:Pessoa)
WHERE p.nome CONTAINS "a"
RETURN p.nome

-- IN (lista de valores)
MATCH (p:Pessoa)
WHERE p.cidade IN ["Patos de Minas", "Belo Horizonte"]
RETURN p.nome, p.cidade

-- IS NULL / IS NOT NULL
MATCH (p:Pessoa)
WHERE p.email IS NULL
RETURN p.nome
```

### 3.5 RETURN — Retornando dados

```cypher
-- Retornar nó completo
MATCH (p:Pessoa) RETURN p

-- Retornar propriedades específicas
MATCH (p:Pessoa) RETURN p.nome, p.idade

-- Alias com AS
MATCH (p:Pessoa) RETURN p.nome AS nome, p.idade AS idade

-- ORDER BY
MATCH (p:Pessoa) RETURN p.nome, p.idade ORDER BY p.idade DESC

-- LIMIT
MATCH (p:Pessoa) RETURN p.nome LIMIT 5

-- COUNT
MATCH (p:Pessoa) RETURN COUNT(p) AS total

-- DISTINCT
MATCH (p:Pessoa) RETURN DISTINCT p.cidade
```

### 3.6 SET — Atualizando propriedades

```cypher
-- Atualizar uma propriedade
MATCH (p:Pessoa {nome: "Ana"})
SET p.idade = 31
RETURN p

-- Adicionar nova propriedade
MATCH (p:Pessoa {nome: "Ana"})
SET p.email = "ana@email.com"
RETURN p

-- Adicionar rótulo
MATCH (p:Pessoa {nome: "Ana"})
SET p:Administrador
RETURN p
```

### 3.7 REMOVE — Removendo propriedades e rótulos

```cypher
-- Remover uma propriedade
MATCH (p:Pessoa {nome: "Ana"})
REMOVE p.email
RETURN p

-- Remover um rótulo
MATCH (p:Pessoa:Administrador {nome: "Ana"})
REMOVE p:Administrador
RETURN p
```

### 3.8 DELETE — Deletando nós e relacionamentos

```cypher
-- Deletar um relacionamento
MATCH (:Pessoa {nome: "Ana"})-[r:CONHECE]->(:Pessoa {nome: "Bruno"})
DELETE r

-- Deletar um nó (precisa não ter relacionamentos)
MATCH (p:Pessoa {nome: "Bruno"})
DELETE p

-- Deletar nó E todos seus relacionamentos (DETACH DELETE)
MATCH (p:Pessoa {nome: "Bruno"})
DETACH DELETE p

-- Deletar TODOS os dados do banco (use com cuidado!)
MATCH (n)
DETACH DELETE n
```

### 3.9 MERGE — Criar se não existir

`MERGE` é um `CREATE` inteligente: cria o nó/relacionamento somente se ele ainda não existir.

```cypher
-- Cria "Ana" apenas se não existir uma Pessoa com esse nome
MERGE (p:Pessoa {nome: "Ana"})
RETURN p

-- Com ON CREATE e ON MATCH
MERGE (p:Pessoa {nome: "Ana"})
ON CREATE SET p.criado_em = date()
ON MATCH SET p.acessado_em = date()
RETURN p
```

### 3.10 Funções úteis

```cypher
-- Funções de string
RETURN toUpper("ana")         -- "ANA"
RETURN toLower("ANA")         -- "ana"
RETURN size("texto")          -- 5
RETURN substring("texto", 0, 3) -- "tex"

-- Funções numéricas
RETURN abs(-5)     -- 5
RETURN round(3.7)  -- 4
RETURN sqrt(16)    -- 4.0

-- Funções de lista
RETURN size([1,2,3])          -- 3
RETURN [1,2,3,4,5][2]         -- 3 (índice base 0)

-- Funções de data
RETURN date()                 -- data atual
RETURN date("2024-01-15")     -- data específica

-- ID e rótulos
MATCH (p:Pessoa {nome: "Ana"})
RETURN id(p), labels(p), keys(p)
```

### 3.11 Navegando relacionamentos em profundidade

```cypher
-- Amigos de amigos (2 níveis)
MATCH (a:Pessoa {nome: "Ana"})-[:CONHECE*2]->(c:Pessoa)
RETURN c.nome

-- Qualquer profundidade (use com cuidado em grafos grandes)
MATCH (a:Pessoa {nome: "Ana"})-[:CONHECE*]->(c:Pessoa)
RETURN c.nome

-- Entre 1 e 3 níveis de profundidade
MATCH (a:Pessoa {nome: "Ana"})-[:CONHECE*1..3]->(c:Pessoa)
RETURN c.nome

-- Caminho mais curto entre dois nós
MATCH caminho = shortestPath(
  (:Pessoa {nome: "Ana"})-[:CONHECE*]-(:Pessoa {nome: "Carlos"})
)
RETURN caminho
```

---

## Módulo 4: Prática Guiada — Rede Social

Vamos construir um grafo de rede social passo a passo no Neo4j Browser.

### 4.1 Criando os usuários

Cole e execute cada bloco no Neo4j Browser (`http://localhost:7474`):

```cypher
CREATE (:Pessoa {nome: "Ana", idade: 30, cidade: "Patos de Minas"})
CREATE (:Pessoa {nome: "Bruno", idade: 25, cidade: "Belo Horizonte"})
CREATE (:Pessoa {nome: "Carlos", idade: 35, cidade: "Patos de Minas"})
CREATE (:Pessoa {nome: "Diana", idade: 28, cidade: "Uberlândia"})
CREATE (:Pessoa {nome: "Eduardo", idade: 22, cidade: "Patos de Minas"})
```

### 4.2 Criando os relacionamentos

```cypher
MATCH (ana:Pessoa {nome: "Ana"}), (bruno:Pessoa {nome: "Bruno"})
CREATE (ana)-[:CONHECE {desde: 2020}]->(bruno)

MATCH (ana:Pessoa {nome: "Ana"}), (carlos:Pessoa {nome: "Carlos"})
CREATE (ana)-[:CONHECE {desde: 2018}]->(carlos)

MATCH (bruno:Pessoa {nome: "Bruno"}), (diana:Pessoa {nome: "Diana"})
CREATE (bruno)-[:CONHECE {desde: 2022}]->(diana)

MATCH (carlos:Pessoa {nome: "Carlos"}), (eduardo:Pessoa {nome: "Eduardo"})
CREATE (carlos)-[:CONHECE {desde: 2021}]->(eduardo)

MATCH (diana:Pessoa {nome: "Diana"}), (eduardo:Pessoa {nome: "Eduardo"})
CREATE (diana)-[:CONHECE {desde: 2023}]->(eduardo)
```

### 4.3 Consultas sobre a rede social

**Ver o grafo completo:**
```cypher
MATCH (p:Pessoa)-[r:CONHECE]->(q:Pessoa)
RETURN p, r, q
```

**Quem Ana conhece?**
```cypher
MATCH (:Pessoa {nome: "Ana"})-[:CONHECE]->(conhecido:Pessoa)
RETURN conhecido.nome, conhecido.cidade
```

**Amigos de amigos de Ana (que Ana ainda não conhece):**
```cypher
MATCH (ana:Pessoa {nome: "Ana"})-[:CONHECE]->()-[:CONHECE]->(sugestao:Pessoa)
WHERE NOT (ana)-[:CONHECE]->(sugestao) AND sugestao <> ana
RETURN DISTINCT sugestao.nome AS sugestao
```

**Quantas conexões cada pessoa tem?**
```cypher
MATCH (p:Pessoa)-[:CONHECE]->(outro)
RETURN p.nome AS pessoa, COUNT(outro) AS conexoes
ORDER BY conexoes DESC
```

**Quem mora em Patos de Minas?**
```cypher
MATCH (p:Pessoa {cidade: "Patos de Minas"})
RETURN p.nome, p.idade
```

**Caminho entre Ana e Eduardo:**
```cypher
MATCH caminho = shortestPath(
  (:Pessoa {nome: "Ana"})-[:CONHECE*]-(:Pessoa {nome: "Eduardo"})
)
RETURN caminho
```

---

## Módulo 5: Prática Guiada — Sistema de Filmes

### 5.1 Limpando o banco (opcional)

```cypher
MATCH (n) DETACH DELETE n
```

### 5.2 Criando o modelo

```cypher
-- Filmes
CREATE (:Filme {titulo: "Inception", ano: 2010, genero: "Ficção Científica"})
CREATE (:Filme {titulo: "The Dark Knight", ano: 2008, genero: "Ação"})
CREATE (:Filme {titulo: "Interstellar", ano: 2014, genero: "Ficção Científica"})
CREATE (:Filme {titulo: "Pulp Fiction", ano: 1994, genero: "Crime"})
CREATE (:Filme {titulo: "The Matrix", ano: 1999, genero: "Ficção Científica"})

-- Diretores
CREATE (:Diretor {nome: "Christopher Nolan"})
CREATE (:Diretor {nome: "Quentin Tarantino"})
CREATE (:Diretor {nome: "Lana Wachowski"})

-- Atores
CREATE (:Ator {nome: "Leonardo DiCaprio"})
CREATE (:Ator {nome: "Christian Bale"})
CREATE (:Ator {nome: "Matthew McConaughey"})
CREATE (:Ator {nome: "John Travolta"})
CREATE (:Ator {nome: "Keanu Reeves"})

-- Usuários
CREATE (:Usuario {nome: "Alice"})
CREATE (:Usuario {nome: "Bob"})
CREATE (:Usuario {nome: "Carol"})
```

### 5.3 Relacionamentos

```cypher
-- Direção
MATCH (d:Diretor {nome: "Christopher Nolan"}), (f:Filme {titulo: "Inception"})
CREATE (d)-[:DIRIGIU]->(f)

MATCH (d:Diretor {nome: "Christopher Nolan"}), (f:Filme {titulo: "The Dark Knight"})
CREATE (d)-[:DIRIGIU]->(f)

MATCH (d:Diretor {nome: "Christopher Nolan"}), (f:Filme {titulo: "Interstellar"})
CREATE (d)-[:DIRIGIU]->(f)

MATCH (d:Diretor {nome: "Quentin Tarantino"}), (f:Filme {titulo: "Pulp Fiction"})
CREATE (d)-[:DIRIGIU]->(f)

MATCH (d:Diretor {nome: "Lana Wachowski"}), (f:Filme {titulo: "The Matrix"})
CREATE (d)-[:DIRIGIU]->(f)

-- Atuação
MATCH (a:Ator {nome: "Leonardo DiCaprio"}), (f:Filme {titulo: "Inception"})
CREATE (a)-[:ATUOU_EM {personagem: "Cobb"}]->(f)

MATCH (a:Ator {nome: "Christian Bale"}), (f:Filme {titulo: "The Dark Knight"})
CREATE (a)-[:ATUOU_EM {personagem: "Batman"}]->(f)

MATCH (a:Ator {nome: "Matthew McConaughey"}), (f:Filme {titulo: "Interstellar"})
CREATE (a)-[:ATUOU_EM {personagem: "Cooper"}]->(f)

MATCH (a:Ator {nome: "John Travolta"}), (f:Filme {titulo: "Pulp Fiction"})
CREATE (a)-[:ATUOU_EM {personagem: "Vincent"}]->(f)

MATCH (a:Ator {nome: "Keanu Reeves"}), (f:Filme {titulo: "The Matrix"})
CREATE (a)-[:ATUOU_EM {personagem: "Neo"}]->(f)

-- Avaliações de usuários
MATCH (u:Usuario {nome: "Alice"}), (f:Filme {titulo: "Inception"})
CREATE (u)-[:AVALIOU {nota: 9.5, comentario: "Incrível!"}]->(f)

MATCH (u:Usuario {nome: "Alice"}), (f:Filme {titulo: "Interstellar"})
CREATE (u)-[:AVALIOU {nota: 9.0}]->(f)

MATCH (u:Usuario {nome: "Bob"}), (f:Filme {titulo: "The Dark Knight"})
CREATE (u)-[:AVALIOU {nota: 10.0}]->(f)

MATCH (u:Usuario {nome: "Bob"}), (f:Filme {titulo: "Inception"})
CREATE (u)-[:AVALIOU {nota: 8.5}]->(f)

MATCH (u:Usuario {nome: "Carol"}), (f:Filme {titulo: "The Matrix"})
CREATE (u)-[:AVALIOU {nota: 9.0}]->(f)

MATCH (u:Usuario {nome: "Carol"}), (f:Filme {titulo: "Pulp Fiction"})
CREATE (u)-[:AVALIOU {nota: 8.0}]->(f)
```

### 5.4 Consultas analíticas

**Todos os filmes e seus diretores:**
```cypher
MATCH (d:Diretor)-[:DIRIGIU]->(f:Filme)
RETURN d.nome AS diretor, f.titulo AS filme, f.ano AS ano
ORDER BY f.ano
```

**Qual ator atuou em qual filme e com qual personagem?**
```cypher
MATCH (a:Ator)-[r:ATUOU_EM]->(f:Filme)
RETURN a.nome AS ator, r.personagem AS personagem, f.titulo AS filme
```

**Filmes de Ficção Científica com nota média acima de 9:**
```cypher
MATCH (u:Usuario)-[av:AVALIOU]->(f:Filme {genero: "Ficção Científica"})
WITH f, AVG(av.nota) AS media
WHERE media > 9
RETURN f.titulo, round(media * 10) / 10 AS media_nota
ORDER BY media_nota DESC
```

**Sistema de recomendação: "Usuários que assistiram X também gostaram de..."**
```cypher
MATCH (u:Usuario)-[:AVALIOU]->(:Filme {titulo: "Inception"})<-[:AVALIOU]-(outro:Usuario)
MATCH (outro)-[:AVALIOU]->(recomendacao:Filme)
WHERE NOT (u)-[:AVALIOU]->(recomendacao)
RETURN DISTINCT recomendacao.titulo AS recomendacao, recomendacao.genero AS genero
```

**Quantos filmes cada diretor tem?**
```cypher
MATCH (d:Diretor)-[:DIRIGIU]->(f:Filme)
RETURN d.nome AS diretor, COUNT(f) AS total_filmes
ORDER BY total_filmes DESC
```

---

## Módulo 6: Exercícios Propostos

### Exercício 1 — Rede Social (Básico)

Use o grafo da Rede Social (Módulo 4) para responder:

1. Liste todos os nós do grafo com seus rótulos e propriedades.
2. Encontre todas as pessoas com mais de 25 anos.
3. Quais pessoas Bruno conhece?
4. Adicione a propriedade `email` para todos os usuários (pode inventar os valores).
5. Crie uma nova pessoa chamada "Fernanda" da cidade de "Uberlândia" e faça com que ela conheça Bruno.
6. Quantas pessoas cada usuário conhece? Ordene do maior para o menor.
7. Existe algum relacionamento mútuo (A conhece B **e** B conhece A)?

```cypher
-- Dica para o exercício 7:
MATCH (a:Pessoa)-[:CONHECE]->(b:Pessoa)-[:CONHECE]->(a)
RETURN a.nome, b.nome
```

### Exercício 2 — Sistema de Filmes (Intermediário)

Use o grafo de Filmes (Módulo 5) para responder:

1. Quais filmes foram lançados após 2000?
2. Qual é a nota média geral de cada filme? Ordene do melhor para o pior.
3. Quais usuários ainda não avaliaram nenhum filme de "Ficção Científica"?
4. Adicione um novo filme à sua escolha com diretor e pelo menos um ator.
5. Atualize a nota que Alice deu para "Inception" para 10.0.
6. Delete o relacionamento de avaliação de Carol com "Pulp Fiction".
7. Liste os atores que trabalharam com o diretor Christopher Nolan (mesmo que indiretamente via filme).

### Exercício 3 — Modelagem Livre (Avançado)

Modele um dos cenários abaixo do zero — crie os nós, relacionamentos e pelo menos 5 consultas analíticas:

**Opção A — Sistema Acadêmico:**
Alunos, Professores, Disciplinas, Turmas. Relacionamentos: MATRICULADO_EM, MINISTRA, PRE_REQUISITO_DE.

**Opção B — E-commerce:**
Clientes, Produtos, Categorias, Pedidos. Relacionamentos: COMPROU, PERTENCE_A, CONTEM.

**Opção C — Infraestrutura de TI:**
Servidores, Serviços, Bancos de Dados, APIs. Relacionamentos: DEPENDE_DE, HOSPEDA, CONECTA_A.

---

## Referências e Próximos Passos

- **Documentação oficial:** https://neo4j.com/docs/
- **Cypher Cheat Sheet:** https://neo4j.com/docs/cypher-cheat-sheet/
- **Sandbox online (sem instalação):** https://sandbox.neo4j.com/
- **Curso gratuito Neo4j:** https://graphacademy.neo4j.com/

### Algoritmos de Grafos (para explorar depois)

O Neo4j possui uma biblioteca nativa chamada **Graph Data Science (GDS)** com algoritmos como:

| Algoritmo | Uso |
|---|---|
| PageRank | Classificar importância dos nós (base do Google) |
| Shortest Path | Caminho mínimo entre dois nós |
| Community Detection | Identificar grupos/comunidades |
| Centrality | Nós mais influentes na rede |
| Similarity | Encontrar nós semelhantes |

---

*Material elaborado para uso em aula prática — Neo4j Desktop v2.1.4*
