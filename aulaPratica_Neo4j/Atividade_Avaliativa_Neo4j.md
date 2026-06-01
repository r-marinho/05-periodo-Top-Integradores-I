# CENTRO UNIVERSITÁRIO DE PATOS DE MINAS – UNIPAM
## BACHARELADO EM SISTEMAS DE INFORMAÇÃO
**TURMA:** 5º PERÍODO
**DISCIPLINA:** TÓPICOS INTEGRADORES I
**PROFESSOR:** RAFAEL MARINHO E SILVA

**VALOR:** 02 PONTOS
**DATA DE ENTREGA (até o final da aula):** 02/06/2026

---

## ATIVIDADE AVALIATIVA – Neo4j
### Cenário: Rede de Indicação Médica **"MedConnect"**

A clínica MedConnect reúne médicos de diversas especialidades em diferentes hospitais. Quando um médico identifica que um paciente precisa de atendimento em outra área, ele **indica** um colega especialista, formando, ao longo do tempo, uma rede de indicações entre profissionais.

O sistema registra três tipos de nós "`Medico`, `Hospital` e `Paciente`"— conectados por três tipos de relacionamentos:

- `(Medico)-[:TRABALHA_EM]->(Hospital)`
- `(Medico)-[:INDICOU {data}]->(Medico)`
- `(Paciente)-[:CONSULTOU {data, motivo}]->(Medico)`

**Por que Neo4j e não um SGBD relacional?**
- A rede de indicações entre médicos é um grafo por natureza: um clínico geral indica um cardiologista, que pode indicar um neurologista, e assim por diante. Navegar essa cadeia transitivamente em SQL exige `WITH RECURSIVE`. Em Cypher, o operador `*` resolve em uma linha: `[:INDICOU*]`.
- Detectar médicos que se indicam mutuamente sem passagem por paciente — padrão associado a fraude em convênios — é uma busca por ciclos no grafo, direta em Cypher e trabalhosa em SQL.
- O caminho de indicações entre dois médicos é resolvido com `shortestPath()` em uma linha.
- As propriedades `data` (em `INDICOU`) e `data` e `motivo` (em `CONSULTOU`) ficam no próprio relacionamento, sem tabelas de junção.

### Instruções gerais

A atividade deverá ser resolvida **individualmente**, diretamente no laboratório, e **apresentada ao professor ao final da aula** com o Neo4j Browser aberto exibindo o grafo final.

**Como abrir o ambiente:**
1. Abra o **Neo4j Desktop**.
2. Inicie o banco de dados do projeto clicando em **Start**.
3. Clique em **Open** para abrir o **Neo4j Browser** (`http://localhost:7474`).
4. Faça login com as credenciais configuradas no projeto.

**Como usar o Neo4j Browser:**
- Digite os comandos Cypher na **barra de consulta** no topo da tela.
- Pressione **Ctrl + Enter** (ou clique no botão ▶) para executar.
- O resultado aparece no painel abaixo — alterne entre a **visualização de grafo** (ícone de bolhas) e a **tabela** (ícone de grade) conforme necessário.

**Regra obrigatória:** **Todos os comandos devem ser digitados manualmente no Neo4j Browser.** O objetivo da prática é que o aluno leia, entenda e memorize a sintaxe Cypher.

Para cada questão, o aluno deve:
1. **Digitar o comando** no Neo4j Browser.
2. **Conferir o resultado** retornado — como grafo ou tabela.
3. **Observar** os nós e relacionamentos criados ou modificados no painel de resultado.

---

## PARTE I — Construindo o grafo (`CREATE`)

### Questão 1 — Verificando o estado inicial do banco

Execute o comando abaixo para confirmar que o Neo4j Browser está conectado e que o banco não possui nós cadastrados:

```cypher
MATCH (n) RETURN count(n) AS total_nos
```

O resultado deve ser `0`. Caso contrário, avise o professor antes de continuar.

---

### Questão 2 — Criando os nós de `Hospital`

Crie os 3 hospitais do sistema, executando cada linha separadamente:

```cypher
CREATE (:Hospital {nome: "Hospital São Lucas", cidade: "Patos de Minas"})
CREATE (:Hospital {nome: "UPA Central", cidade: "Patos de Minas"})
CREATE (:Hospital {nome: "Hospital das Clínicas", cidade: "Uberlândia"})
```

Após criar os 3 hospitais, execute a consulta abaixo e verifique os nós no grafo:

```cypher
MATCH (h:Hospital) RETURN h.nome AS hospital, h.cidade AS cidade
```

---

### Questão 3 — Criando os nós de `Medico`

Crie os 6 médicos do sistema, executando cada linha separadamente. Observe que o campo `plano_aceito` é uma lista de convênios atendidos por cada médico:

```cypher
CREATE (:Medico {nome: "Carlos Souza", crm: "MG-12345", especialidade: "Clínico Geral", plano_aceito: ["Unimed", "Amil"]})
CREATE (:Medico {nome: "Ana Ferreira", crm: "MG-23456", especialidade: "Cardiologia", plano_aceito: ["Unimed", "Amil"]})
CREATE (:Medico {nome: "Bruno Lima", crm: "MG-34567", especialidade: "Ortopedia", plano_aceito: ["Unimed"]})
CREATE (:Medico {nome: "Diana Castro", crm: "MG-45678", especialidade: "Neurologia", plano_aceito: ["Amil"]})
CREATE (:Medico {nome: "Eduardo Pires", crm: "MG-56789", especialidade: "Dermatologia", plano_aceito: ["Unimed"]})
CREATE (:Medico {nome: "Fernanda Rocha", crm: "MG-67890", especialidade: "Cardiologia", plano_aceito: ["Amil"]})
```

---

### Questão 4 — Criando os nós de `Paciente`

Crie os 4 pacientes do sistema, executando cada linha separadamente:

```cypher
CREATE (:Paciente {nome: "Marcos Alves", idade: 45, plano: "Unimed"})
CREATE (:Paciente {nome: "Julia Santos", idade: 32, plano: "Amil"})
CREATE (:Paciente {nome: "Roberto Dias", idade: 58, plano: "Unimed"})
CREATE (:Paciente {nome: "Patrícia Lima", idade: 27, plano: "Unimed"})
```

---

### Questão 5 — Relacionamentos: médico × hospital (`TRABALHA_EM`)

Crie os relacionamentos entre cada médico e o hospital onde trabalha. Execute cada bloco individualmente:

```cypher
MATCH (m:Medico {nome: "Carlos Souza"}), (h:Hospital {nome: "Hospital São Lucas"})
CREATE (m)-[:TRABALHA_EM]->(h)

MATCH (m:Medico {nome: "Ana Ferreira"}), (h:Hospital {nome: "Hospital São Lucas"})
CREATE (m)-[:TRABALHA_EM]->(h)

MATCH (m:Medico {nome: "Bruno Lima"}), (h:Hospital {nome: "UPA Central"})
CREATE (m)-[:TRABALHA_EM]->(h)

MATCH (m:Medico {nome: "Diana Castro"}), (h:Hospital {nome: "Hospital das Clínicas"})
CREATE (m)-[:TRABALHA_EM]->(h)

MATCH (m:Medico {nome: "Eduardo Pires"}), (h:Hospital {nome: "Hospital São Lucas"})
CREATE (m)-[:TRABALHA_EM]->(h)

MATCH (m:Medico {nome: "Fernanda Rocha"}), (h:Hospital {nome: "Hospital das Clínicas"})
CREATE (m)-[:TRABALHA_EM]->(h)
```

Ao terminar, execute e verifique o grafo médico–hospital:

```cypher
MATCH (m:Medico)-[r:TRABALHA_EM]->(h:Hospital) RETURN m, r, h
```

---

### Questão 6 — Relacionamentos: rede de indicações entre médicos (`INDICOU`)

Ao longo do tempo, os médicos foram indicando colegas especialistas para seus pacientes, formando a seguinte rede:

```
Carlos Souza  ──▶  Ana Ferreira  ──▶  Diana Castro  ──▶  Fernanda Rocha
Carlos Souza  ──▶  Bruno Lima    ──▶  Diana Castro
Carlos Souza  ──▶  Eduardo Pires
```

Crie cada relacionamento individualmente:

```cypher
MATCH (a:Medico {nome: "Carlos Souza"}), (b:Medico {nome: "Ana Ferreira"})
CREATE (a)-[:INDICOU {data: "2025-03-10"}]->(b)

MATCH (a:Medico {nome: "Carlos Souza"}), (b:Medico {nome: "Bruno Lima"})
CREATE (a)-[:INDICOU {data: "2025-04-05"}]->(b)

MATCH (a:Medico {nome: "Carlos Souza"}), (b:Medico {nome: "Eduardo Pires"})
CREATE (a)-[:INDICOU {data: "2025-02-20"}]->(b)

MATCH (a:Medico {nome: "Ana Ferreira"}), (b:Medico {nome: "Diana Castro"})
CREATE (a)-[:INDICOU {data: "2025-03-15"}]->(b)

MATCH (a:Medico {nome: "Bruno Lima"}), (b:Medico {nome: "Diana Castro"})
CREATE (a)-[:INDICOU {data: "2025-04-10"}]->(b)

MATCH (a:Medico {nome: "Diana Castro"}), (b:Medico {nome: "Fernanda Rocha"})
CREATE (a)-[:INDICOU {data: "2025-05-01"}]->(b)
```

Visualize a rede de indicações:

```cypher
MATCH (a:Medico)-[r:INDICOU]->(b:Medico) RETURN a, r, b
```

---

### Questão 7 — Relacionamentos: consultas dos pacientes (`CONSULTOU`)

Registre as consultas realizadas por cada paciente. Execute cada bloco individualmente.

**Marcos Alves** (consultou 2 médicos):

```cypher
MATCH (p:Paciente {nome: "Marcos Alves"}), (m:Medico {nome: "Carlos Souza"})
CREATE (p)-[:CONSULTOU {data: "2025-03-08", motivo: "dor no peito"}]->(m)

MATCH (p:Paciente {nome: "Marcos Alves"}), (m:Medico {nome: "Ana Ferreira"})
CREATE (p)-[:CONSULTOU {data: "2025-03-12", motivo: "avaliação cardíaca"}]->(m)
```

**Julia Santos** (consultou 2 médicos):

```cypher
MATCH (p:Paciente {nome: "Julia Santos"}), (m:Medico {nome: "Ana Ferreira"})
CREATE (p)-[:CONSULTOU {data: "2025-04-01", motivo: "palpitações"}]->(m)

MATCH (p:Paciente {nome: "Julia Santos"}), (m:Medico {nome: "Diana Castro"})
CREATE (p)-[:CONSULTOU {data: "2025-04-08", motivo: "cefaleia intensa"}]->(m)
```

**Roberto Dias** (consultou 2 médicos):

```cypher
MATCH (p:Paciente {nome: "Roberto Dias"}), (m:Medico {nome: "Carlos Souza"})
CREATE (p)-[:CONSULTOU {data: "2025-04-03", motivo: "dor no joelho"}]->(m)

MATCH (p:Paciente {nome: "Roberto Dias"}), (m:Medico {nome: "Bruno Lima"})
CREATE (p)-[:CONSULTOU {data: "2025-04-07", motivo: "avaliação ortopédica"}]->(m)
```

**Patrícia Lima** (consultou 1 médico):

```cypher
MATCH (p:Paciente {nome: "Patrícia Lima"}), (m:Medico {nome: "Eduardo Pires"})
CREATE (p)-[:CONSULTOU {data: "2025-02-18", motivo: "lesão na pele"}]->(m)
```

Ao concluir todos os blocos, visualize o grafo completo:

```cypher
MATCH (n)-[r]->(m) RETURN n, r, m
```

---

## PARTE II — Consultando o grafo (`MATCH`, `WHERE`, `RETURN`)

### Questão 8 — Médicos, especialidades e hospitais

Liste todos os médicos com sua especialidade e o hospital onde trabalham, ordenados pelo nome do hospital:

```cypher
MATCH (m:Medico)-[:TRABALHA_EM]->(h:Hospital)
RETURN m.nome AS medico, m.especialidade AS especialidade, h.nome AS hospital
ORDER BY h.nome
```

---

### Questão 9 — Médicos que aceitam o plano "Unimed"

Use `WHERE` com o operador `IN` para retornar os médicos que aceitam o convênio Unimed:

```cypher
MATCH (m:Medico)
WHERE "Unimed" IN m.plano_aceito
RETURN m.nome AS medico, m.especialidade AS especialidade
ORDER BY m.especialidade
```

---

### Questão 10 — Pacientes que consultaram o Dr. Carlos Souza

Retorne os pacientes que consultaram o Dr. Carlos Souza, com a data e o motivo de cada consulta:

```cypher
MATCH (p:Paciente)-[r:CONSULTOU]->(m:Medico {nome: "Carlos Souza"})
RETURN p.nome AS paciente, r.data AS data, r.motivo AS motivo
ORDER BY r.data
```

---

### Questão 11 — Indicações diretas do Dr. Carlos Souza

Liste os médicos para quem o Dr. Carlos Souza fez indicações diretamente, com a data de cada indicação:

```cypher
MATCH (:Medico {nome: "Carlos Souza"})-[r:INDICOU]->(m:Medico)
RETURN m.nome AS medico_indicado, m.especialidade AS especialidade, r.data AS data_indicacao
```

---

### Questão 12 — Total de indicações por médico

Use `COUNT` para contar quantas indicações cada médico fez, do maior para o menor:

```cypher
MATCH (m:Medico)-[:INDICOU]->(outro:Medico)
RETURN m.nome AS medico, COUNT(outro) AS total_indicacoes
ORDER BY total_indicacoes DESC
```

---

### Questão 13 — Todos os médicos alcançáveis pela rede de indicações do Dr. Carlos Souza

Use o operador `*` para navegar toda a rede de indicações a partir do Dr. Carlos Souza, em qualquer profundidade:

```cypher
MATCH (:Medico {nome: "Carlos Souza"})-[:INDICOU*]->(m:Medico)
RETURN DISTINCT m.nome AS medico_alcancavel, m.especialidade AS especialidade
```

Compare o resultado com a Questão 11: a diferença é que aqui o `*` percorre todos os níveis da rede, não apenas as indicações diretas.

---

### Questão 14 — Caminho mais curto na rede de indicações (`shortestPath`)

Encontre o caminho mais curto de indicações entre o Dr. Carlos Souza e a Dra. Fernanda Rocha:

```cypher
MATCH caminho = shortestPath(
  (:Medico {nome: "Carlos Souza"})-[:INDICOU*]->(:Medico {nome: "Fernanda Rocha"})
)
RETURN caminho
```

No painel de resultado, certifique-se de estar na **visualização de grafo** — o Neo4j Browser exibe o caminho como uma sequência de nós ligados. Clique em cada nó para ver as propriedades.

---

## PARTE III — Modificando o grafo (`SET`, `REMOVE`, `MERGE`, `DETACH DELETE`)

### Questão 15 — `SET`: atualizando o plano de saúde de um paciente

Marcos Alves trocou de convênio e passou a ter o plano Amil. Atualize a propriedade `plano` do nó:

```cypher
MATCH (p:Paciente {nome: "Marcos Alves"})
SET p.plano = "Amil"
RETURN p.nome AS paciente, p.plano AS novo_plano
```

---

### Questão 16 — `SET` e `REMOVE`: adicionando e removendo uma propriedade

Adicione o número de telefone ao nó do Dr. Carlos Souza:

```cypher
MATCH (m:Medico {nome: "Carlos Souza"})
SET m.telefone = "(34) 99999-0000"
RETURN m
```

Confirme que a propriedade `telefone` aparece no nó. Em seguida, remova-a com `REMOVE`:

```cypher
MATCH (m:Medico {nome: "Carlos Souza"})
REMOVE m.telefone
RETURN m
```

Verifique que o campo `telefone` não aparece mais nas propriedades do nó.

---

### Questão 17 — `MERGE`: cadastrando um novo médico

Use `MERGE` para cadastrar a Dra. **Gabriela Mendes**. Execute o comando duas vezes e observe que o segundo `MERGE` não cria um nó duplicado — ele apenas executa o bloco `ON MATCH`:

```cypher
MERGE (m:Medico {crm: "MG-78901"})
ON CREATE SET m.nome = "Gabriela Mendes", m.especialidade = "Pediatria", m.plano_aceito = ["Unimed"]
ON MATCH SET m.acessado_em = date()
RETURN m
```

---

### Questão 18 — `DETACH DELETE`: removendo a médica recém-cadastrada

Remova o nó da Dra. Gabriela Mendes e todos os seus relacionamentos:

```cypher
MATCH (m:Medico {nome: "Gabriela Mendes"})
DETACH DELETE m
```

Confirme a remoção listando todos os médicos:

```cypher
MATCH (m:Medico) RETURN m.nome AS medico ORDER BY m.nome
```

---

## PARTE IV — Apresentação final ao professor

### Questão 19 — Apresentação dos resultados

Quando o professor passar em sua mesa, apresente:

**No Neo4j Browser:**

1. Execute o comando abaixo para exibir o **grafo completo** com todos os nós e relacionamentos:

```cypher
MATCH (n)-[r]->(m) RETURN n, r, m
```

2. Execute novamente a consulta da **Questão 13** (rede transitiva de indicações com `*`) e explique ao professor a diferença em relação à Questão 11.

3. Execute novamente a consulta da **Questão 14** (`shortestPath`) e identifique verbalmente o caminho exibido no grafo.

4. Esteja preparado para responder: **"Qual o caminho de indicações entre o Dr. Carlos Souza e a Dra. Fernanda Rocha? Quantos relacionamentos `INDICOU` compõem esse caminho?"**

---

**Boa atividade!**
