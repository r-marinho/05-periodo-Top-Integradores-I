# Introdução aos Conceitos sobre JavaScript

**Centro Universitário de Patos de Minas, UNIPAM**  
**Bacharelado em Sistemas de Informação**  
**Turma: 5º período**  
**Tópicos Integradores I**  
**Professor: Rafael Marinho e Silva**

## Objetivo da aula

Este roteiro apresenta os conceitos fundamentais de JavaScript por meio de exemplos práticos. O foco é compreender a sintaxe básica da linguagem, o uso de variáveis, estruturas de repetição, funções, objetos, classes, coleções, métodos de arrays e funções de seta.

Ao final da aula, o estudante deverá ser capaz de:
- reconhecer a finalidade de cada recurso da linguagem;
- compreender a diferença entre variáveis, funções, objetos e classes;
- usar estruturas de controle e métodos de arrays em pequenos programas;
- executar os códigos no Node.js dentro do GitHub Codespaces;
- salvar e enviar as alterações para o GitHub usando Git.

---

## Como executar os códigos no Codespaces do GitHub

### 1. Criar o repositório
1. Acesse o GitHub.
2. Crie um novo repositório, por exemplo, `javascript-tutorial`.
3. Abra o repositório no Codespaces.

### 2. Criar o arquivo JavaScript
1. No Codespace, crie um arquivo chamado `exemplos.js`.
2. Copie os exemplos para o arquivo.
3. Execute no terminal com o comando:

```bash
node exemplos.js
```

### 3. Observação importante sobre a execução
Como este material reúne vários exemplos, alguns deles reutilizam nomes de variáveis, como `numeros`, `pessoa` e `soma`. Em JavaScript, isso pode gerar erro se tudo estiver no mesmo arquivo e no mesmo escopo.

Para evitar problemas, o aluno pode:
- executar um exemplo por vez;
- separar os exemplos em arquivos diferentes;
- ou renomear as variáveis repetidas.

Essa observação é muito importante para a prática, porque ajuda a entender o papel do escopo e evita erros de declaração duplicada.

---

## Exemplo 1. Variáveis, `var`, `let` e `const`

### Código

```javascript
// Exemplo 1: Variáveis (var, let, const)

// Usando var. Escopo global ou de função
var nome = "João";
console.log(nome);

if (true) {
    var nome = "Maria";
    console.log(nome);
}
console.log(nome);

// Usando let. Escopo de bloco
let idade = 25;
console.log(idade);

if (true) {
    let idade = 30;
    console.log(idade);
}
console.log(idade);

// Usando const. Escopo de bloco e valor constante
const PI = 3.14;
console.log(PI);

if (true) {
    const PI = 3.14159;
    console.log(PI);
}
console.log(PI);
```

### Explicação

Em JavaScript, variáveis servem para armazenar valores que serão usados ao longo do programa. A linguagem oferece três formas principais de declaração.

**`var`**  
A palavra-chave `var` possui escopo de função, ou seja, a variável declarada com `var` fica disponível dentro da função em que foi criada. Se ela for declarada fora de uma função, o comportamento se aproxima de um escopo global. Um ponto importante é que `var` permite redeclaração no mesmo escopo, o que pode gerar confusão e erros lógicos.

No exemplo, `nome` é declarado com `var` fora do `if`. Dentro do bloco, ele é redeclarado com outro valor. Como `var` não respeita escopo de bloco, o valor da variável externa é alterado.

**`let`**  
A palavra-chave `let` possui escopo de bloco, ou seja, a variável existe apenas dentro das chaves `{}` onde foi criada. Ela não permite redeclaração no mesmo escopo. Esse comportamento é mais seguro e previsível.

No exemplo, a variável `idade` dentro do `if` é diferente da `idade` declarada fora. Por isso, o valor original permanece intacto fora do bloco.

**`const`**  
A palavra-chave `const` também possui escopo de bloco, mas sua principal característica é impedir reatribuição. Quando uma variável é criada com `const`, o valor inicial deve ser informado no momento da declaração.

É importante destacar que `const` não torna o conteúdo de objetos e arrays totalmente imutável. Ela impede a mudança da referência, mas ainda pode permitir alterações internas em estruturas mutáveis.

### Conceitos essenciais
- `var` deve ser evitado em códigos modernos, salvo necessidade específica.
- `let` é indicado para valores que podem mudar.
- `const` é a melhor escolha quando o valor não deve ser reatribuído.
- Escopo é o local onde a variável pode ser acessada.
- O uso correto de variáveis melhora a organização e reduz erros.

---

## Exemplo 2. Laços de repetição

### Código

```javascript
// Exemplo 2: Laços de Repetição

// Laço for
for (let i = 0; i < 5; i++) {
    console.log("Iteração for: " + i);
}

// Laço while
let j = 0;
while (j < 5) {
    console.log("Iteração while: " + j);
    j++;
}

// Laço do...while
let k = 0;
do {
    console.log("Iteração do...while: " + k);
    k++;
} while (k < 5);
```

### Explicação

Laços de repetição são estruturas que permitem executar um bloco de código várias vezes, de acordo com uma condição.

**`for`**  
É usado quando se sabe, de forma aproximada, quantas vezes o bloco será executado. Ele reúne inicialização, condição e incremento em uma única estrutura.

No exemplo, `i` começa em 0, continua enquanto for menor que 5 e é incrementado a cada rodada.

**`while`**  
É usado quando a repetição depende de uma condição que é testada antes da execução do bloco. Se a condição for falsa logo no início, o bloco pode não executar nenhuma vez.

No exemplo, `j` é iniciado com 0 e, enquanto for menor que 5, o laço continua.

**`do...while`**  
É parecido com `while`, mas a diferença é que o bloco é executado pelo menos uma vez, porque a condição é testada somente depois da primeira execução.

No exemplo, `k` imprime o valor e só depois verifica se ainda deve continuar.

### Conceitos essenciais
- Use `for` quando houver contagem definida.
- Use `while` quando a repetição depender de uma condição que pode ou não começar verdadeira.
- Use `do...while` quando for necessário executar pelo menos uma vez.
- Em todos os casos, é importante evitar laços infinitos.

---

## Exemplo 3. Funções e objetos

### Código

```javascript
// Exemplo 3: Funções e Objetos

// Função simples
function saudacao(nome) {
    return "Olá, " + nome + "!";
}

console.log(saudacao("Ana"));

// Função anônima
const soma = function(a, b) {
    return a + b;
};

console.log(soma(5, 3));

// Arrow function
const multiplicacao = (a, b) => a * b;

console.log(multiplicacao(4, 2));

// Criando um objeto
const pessoa = {
    nome: "Carlos",
    idade: 28,
    profissao: "Desenvolvedor",
    saudar: function() {
        return "Oi, meu nome é " + this.nome + " e eu sou um " + this.profissao + ".";
    }
};

console.log(pessoa.nome);
console.log(pessoa.saudar());
```

### Explicação

As funções são blocos de código reutilizáveis. Elas ajudam a organizar o programa, evitar repetição e tornar o código mais legível.

**Função declarada**  
A função `saudacao` foi criada com a sintaxe tradicional. Ela recebe um parâmetro `nome` e devolve uma mensagem. Esse tipo de função é muito usado em exemplos iniciais porque deixa claro o relacionamento entre entrada e saída.

**Função anônima**  
A função atribuída à constante `soma` não tem nome próprio. Ela é armazenada em uma variável e depois chamada normalmente. Esse formato é muito comum quando a função será usada em uma variável, em um callback ou em estruturas mais modernas.

**Arrow function**  
A função `multiplicacao` usa a sintaxe de seta. Ela é mais curta e muito comum em funções simples e callbacks. Em geral, é bastante usada em métodos de array, como `map`, `filter` e `reduce`.

**Objeto**  
O objeto `pessoa` reúne propriedades, como `nome`, `idade` e `profissao`, além de um método chamado `saudar`. Objetos representam entidades do mundo real ou estruturas de dados organizadas por pares de chave e valor.

O uso de `this.nome` e `this.profissao` mostra que o método acessa as propriedades do próprio objeto.

### Conceitos essenciais
- Funções encapsulam comportamento.
- Objetos armazenam dados e comportamentos.
- Métodos são funções dentro de objetos.
- `this` representa o objeto atual em muitos contextos de método.
- Arrow functions são curtas, mas não substituem todas as situações da função tradicional.

---

## Exemplo 4. Classes e objetos

### Código

```javascript
// Exemplo 4: Classes
class Animal {
    constructor(nome, tipo) {
        this.nome = nome;
        this.tipo = tipo;
    }

    exibirInformacoes() {
        return `Este é um ${this.tipo} chamado ${this.nome}.`;
    }
}

const cachorro = new Animal("Rex", "cachorro");
const gato = new Animal("Mimi", "gato");

console.log(cachorro.exibirInformacoes());
console.log(gato.exibirInformacoes());
```

### Explicação

As classes são uma forma mais organizada de criar objetos em JavaScript. Elas funcionam como moldes para gerar instâncias.

**`constructor`**  
É o método especial executado quando um objeto é criado com `new`. Ele recebe os valores iniciais e atribui esses valores às propriedades do objeto.

**Métodos da classe**  
O método `exibirInformacoes` pertence à classe e pode ser usado por qualquer objeto criado a partir dela.

**Instanciação**  
As linhas com `new Animal(...)` criam objetos concretos, chamados de instâncias. Cada instância possui seus próprios valores de `nome` e `tipo`.

### Conceitos essenciais
- Classe é o modelo.
- Objeto é a instância criada a partir do modelo.
- `new` cria uma nova instância.
- O `constructor` inicializa o objeto.
- Classes ajudam na organização de códigos orientados a objetos.

---

## Exemplo 5. Objeto como argumento de função

### Código

```javascript
// Exemplo 5: Objetos e funções

function exibirDetalhesProduto(produto) {
    return `Produto: ${produto.nome}, Preço: R$${produto.preco.toFixed(2)}, Estoque: ${produto.estoque} unidades.`;
}

const produto = {
    nome: "Notebook",
    preco: 4500.99,
    estoque: 20
};

console.log(exibirDetalhesProduto(produto));
```

### Explicação

Neste exemplo, uma função recebe um objeto como parâmetro. Essa prática é muito comum em JavaScript, porque permite passar vários dados organizados em um único argumento.

A função `exibirDetalhesProduto` espera um objeto com as propriedades `nome`, `preco` e `estoque`.

O método `toFixed(2)` é aplicado ao valor numérico `preco` para formatar o número com duas casas decimais. Isso é bastante útil em situações de exibição de preços.

### Conceitos essenciais
- Funções podem receber objetos como entrada.
- Objetos facilitam a organização de dados complexos.
- `toFixed` formata números para exibição.
- Esse padrão é muito usado em aplicações reais, especialmente em formulários, listas e relatórios.

---

## Exemplo 6. Métodos de arrays

### Código

```javascript
const numeros = [1, 2, 3, 4, 5];

numeros.forEach(num => {
    console.log(`Número: ${num}`);
});

const dobrados = numeros.map(num => num * 2);
console.log(dobrados);

const numeros2 = [10, 15, 20, 25];
const maioresQue15 = numeros2.filter(num => num > 15);
console.log(maioresQue15);

const numeros3 = [5, 10, 15, 20];
const maiorQue10 = numeros3.find(num => num > 10);
console.log(maiorQue10);

const numeros4 = [10, 20, 30];
const todosMaioresQue5 = numeros4.every(num => num > 5);
console.log(todosMaioresQue5);

const numeros5 = [5, 10, 15];
const existeMaiorQue10 = numeros5.some(num => num > 10);
console.log(existeMaiorQue10);

const numeros6 = [1, 2, 3, 4];
const soma = numeros6.reduce((acumulador, atual) => acumulador + atual, 0);
console.log(soma);
```

### Explicação

Os arrays possuem métodos muito úteis para manipulação de conjuntos de dados. Esses métodos tornam o código mais expressivo e evitam laços manuais desnecessários.

**`forEach`**  
Executa uma ação para cada item do array. Não retorna um novo array. É útil para efeitos colaterais, como exibir valores no console.

**`map`**  
Cria um novo array com base na transformação dos itens originais. No exemplo, cada número é multiplicado por 2.

**`filter`**  
Cria um novo array contendo apenas os elementos que passam em uma condição. No exemplo, ficam apenas os números maiores que 15.

**`find`**  
Retorna o primeiro elemento que atende ao critério informado. Se nenhum elemento satisfizer a condição, o retorno é `undefined`.

**`every`**  
Verifica se todos os elementos satisfazem a condição. Retorna `true` ou `false`.

**`some`**  
Verifica se pelo menos um elemento satisfaz a condição. Também retorna `true` ou `false`.

**`reduce`**  
Reduz todos os valores do array a um único resultado. Muito usado para somar, agrupar ou transformar coleções em um único valor.

### Conceitos essenciais
- `forEach` percorre, mas não transforma.
- `map` transforma e retorna novo array.
- `filter` seleciona elementos.
- `find` localiza o primeiro item compatível.
- `every` e `some` produzem respostas booleanas.
- `reduce` agrega valores.

---

## Exemplo 7. `for...of` e `for...in`

### Código

```javascript
// for...of
const cores = ['vermelho', 'azul', 'verde'];

for (const cor of cores) {
    console.log(cor);
}

// for...in
const pessoa2 = {
    nome: "Ana",
    idade: 28,
    profissao: "Engenheira"
};

for (const chave in pessoa2) {
    console.log(`${chave}: ${pessoa2[chave]}`);
}
```

### Explicação

Esses dois laços parecem parecidos, mas têm finalidades diferentes.

**`for...of`**  
Percorre valores de objetos iteráveis, como arrays, strings, `Map` e `Set`. No exemplo, cada valor do array `cores` é mostrado diretamente.

**`for...in`**  
Percorre as chaves enumeráveis de um objeto. No exemplo, ele exibe o nome da propriedade e o valor correspondente.

### Conceitos essenciais
- `for...of` é indicado para valores.
- `for...in` é indicado para propriedades.
- Em arrays, `for...of` costuma ser a melhor escolha para percorrer os valores.
- `for...in` é mais apropriado para objetos comuns.

---

## Exemplo 8. `Map` e `WeakMap`

### Código

```javascript
// MAP
const mapa = new Map();
mapa.set('nome', 'Carlos');
mapa.set('idade', 30);

console.log(mapa.get('nome'));
console.log(mapa.has('idade'));

// WeakMap
const obj = { id: 1 };
const weakmap = new WeakMap();
weakmap.set(obj, 'valor associado');

console.log(weakmap.get(obj));
```

### Explicação

**Map**  
`Map` é uma coleção de pares chave-valor. Diferente de objetos comuns, suas chaves podem ser de qualquer tipo, inclusive objetos, números e funções. Ele também mantém a ordem de inserção dos elementos.

Os métodos `set`, `get` e `has` são muito utilizados para inserir, buscar e verificar a existência de chaves.

**WeakMap**  
`WeakMap` é parecido com `Map`, mas com uma diferença importante: as chaves devem ser objetos, e essas referências são fracas. Isso significa que, se o objeto deixar de ser usado em outras partes do programa, ele pode ser removido automaticamente pelo coletor de lixo.

O `WeakMap` não pode ser percorrido como um `Map`, e isso faz parte do seu comportamento de segurança e gerenciamento de memória.

### Conceitos essenciais
- `Map` é ótimo para associações chave-valor mais flexíveis.
- `WeakMap` é útil quando as chaves precisam ser objetos e a coleta automática de memória é importante.
- `WeakMap` não aceita chaves primitivas.
- `Map` é mais visível e navegável do que `WeakMap`.

---

## Exemplo 9. `Set` e `WeakSet`

### Código

```javascript
// Set
const conjunto = new Set();

conjunto.add(1);
conjunto.add(2);
conjunto.add(2);

console.log(conjunto);

// WeakSet
const weakSet = new WeakSet();

const obj1 = {};
const obj2 = {};

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1));
console.log(weakSet.has(obj2));
```

### Explicação

**Set**  
`Set` é uma coleção de valores únicos. Se um valor já existir, ele não será duplicado.

No exemplo, o número 2 é adicionado duas vezes, mas aparece apenas uma vez no conjunto.

**WeakSet**  
`WeakSet` funciona de forma semelhante ao `Set`, mas só aceita objetos. As referências são fracas, o que significa que o coletor de lixo pode remover os objetos quando não houver mais referências a eles.

### Conceitos essenciais
- `Set` elimina valores duplicados.
- `WeakSet` aceita somente objetos.
- `WeakSet` não é ideal para listas comuns de dados.
- `Set` é útil para remover duplicidades e controlar coleções únicas.

---

## Exemplo 10. Outras aplicações de arrow functions

### Código

```javascript
const soma = (a, b) => a + b;
console.log(soma(3, 5));

const criarPessoa = (nome, idade) => ({ nome, idade });

const pessoa3 = criarPessoa("Lucas", 22);
console.log(pessoa3);

const numeros7 = [1, 2, 3, 4, 5];

const quadrados = numeros7.map((numero) => numero * numero);
console.log(quadrados);

const impares = numeros7.filter((numero) => numero % 2 !== 0);
console.log(impares);

const somaTotal = numeros7.reduce((acumulador, numero) => acumulador + numero, 0);
console.log(somaTotal);
```

### Explicação

As arrow functions são uma forma moderna e enxuta de escrever funções. Elas são muito comuns em callbacks, operações com arrays e expressões curtas.

**Função com vários parâmetros**  
No exemplo `soma`, a arrow function recebe dois valores e devolve o resultado da soma.

**Retorno implícito de objeto**  
Quando a função precisa retornar um objeto literal, os parênteses são necessários para evitar ambiguidade. Por isso, `criarPessoa` retorna um objeto com `nome` e `idade`.

**Uso com arrays**  
As funções de seta aparecem com frequência em `map`, `filter` e `reduce`, porque deixam o código mais compacto e direto.

### Conceitos essenciais
- Arrow functions simplificam a escrita.
- São muito usadas em callbacks.
- Podem ter retorno implícito.
- Em alguns contextos, o comportamento de `this` é diferente do das funções tradicionais.

---

## Resumo comparativo dos conteúdos

### Variáveis
- `var`: escopo de função, comportamento antigo.
- `let`: escopo de bloco, mais seguro.
- `const`: escopo de bloco, não permite reatribuição.

### Estruturas de repetição
- `for`: quando há controle de contagem.
- `while`: quando a condição controla a repetição.
- `do...while`: executa ao menos uma vez.

### Funções
- Função declarada.
- Função anônima.
- Arrow function.

### Objetos e classes
- Objetos guardam dados e métodos.
- Classes servem como modelo para criar objetos.

### Arrays
- Métodos como `forEach`, `map`, `filter`, `find`, `every`, `some` e `reduce` são essenciais em JavaScript moderno.

### Coleções especiais
- `Map` e `Set` são coleções modernas.
- `WeakMap` e `WeakSet` usam referências fracas e são úteis em situações específicas.

---

## Atividade prática sugerida

1. Execute cada exemplo separadamente no arquivo `exemplos.js`.
2. Altere os valores e observe as saídas.
3. Crie novos exemplos com nomes de variáveis diferentes.
4. Teste objetos com outras propriedades.
5. Crie arrays novos e aplique `map`, `filter` e `reduce`.
6. Observe a diferença entre `for...of` e `for...in` na prática.

---

## Comandos do Git

### Adicionar alterações
```bash
git add .
```

Esse comando adiciona todas as alterações feitas nos arquivos à área de preparação.

### Criar commit
```bash
git commit -m "mensagem"
```

Esse comando registra um ponto de salvamento no histórico do repositório. A mensagem deve ser clara e objetiva.

### Enviar para o GitHub
```bash
git push origin main
```

Esse comando envia os commits para o repositório remoto no GitHub.

---

## Conclusão

Os exemplos apresentados mostram fundamentos importantes de JavaScript e preparam o estudante para temas mais avançados, como manipulação do DOM, eventos, programação assíncrona, consumo de APIs e desenvolvimento de aplicações web.

O domínio desses conceitos é essencial para quem deseja evoluir na linguagem, pois eles aparecem continuamente em projetos reais, tanto em front-end quanto em back-end com Node.js.
