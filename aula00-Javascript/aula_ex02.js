//Exemplo 2
/*
//função simples
function saudacao(nome){
    return "Olá, " + nome + "!"
}

console.log(saudacao("Rafael"));


//função anônima
const soma = function (a, b){
    return a + b;
}

console.log(soma(10,22));



//Arrow function (função seta)
const multiplicacao = (x,y) => x * y;
console.log(multiplicacao(5,6));

*/

const pessoa = {
    nomeUsuario: "Rafael Marinho",
    idade: 35,
    email:"rafaelmarinho@unipam.edu.br",
    usuario: "aluno",
    saudar: function (){
        return `Oi, meu nome é ${this.nomeUsuario}, e eu sou um ${this.usuario}`;
    }
}

console.log(pessoa.nomeUsuario);
console.log(pessoa.saudar());