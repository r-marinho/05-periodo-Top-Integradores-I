// Função que recebe um objeto como argumento
function exibirInfoProdutos(produto){
    return `Produto: ${produto.nome}, Preço: ${produto.preco.toFixed(2)}, Estoque: ${produto.estoque} unidade.`;
}

const produto1 = {
    nome: "Notebook",
    preco:3500.4859,
    estoque: 10
}


const produto2 = {
    nome: "Monitor",
    preco:500.4859,
    estoque: 15
}

console.log(exibirInfoProdutos(produto1));
console.log(exibirInfoProdutos(produto2));