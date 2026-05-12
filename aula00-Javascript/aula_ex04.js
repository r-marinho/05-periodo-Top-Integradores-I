function exibirInfoProduto(produto){
    return `Produto: ${produto.nome}, 
    Preço: ${produto.preco.toFixed(2)},
    Estoque: ${produto.estoque} unidade(s).`
}

const produto1 = {
    nome: "Notebook",
    preco: 3500.5,
    estoque: 15
}


const produto2 = {
    nome: "Monitor",
    preco: 500,
    estoque: 12
}

//console.log(exibirInfoProduto(produto1));
console.log(produto1);
//console.log(exibirInfoProduto(produto2));
console.log(produto2);