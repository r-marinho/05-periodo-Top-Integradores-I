//Exemplo 2

//Funções Simples
function saudacao(nome){
    return "Olá," + nome + "!";
}

console.log(saudacao(34));

//Função Anônima()
const soma = function (a,b){
    return a + b;
};
console.log(soma("Rafael ","Marinho"));

// Arrow Function (função de seta)
const multiplicacao = (x,y) => x * y;
console.log(multiplicacao(5,6));

//Objeto em javascript
const pessoa = {
    nomeUsuario: "Rafael Marinho",
    idade: 34,
    email: "rafaelmarinho@unipam.edu.br",
    usuario: "Professor",
    saudar: function(){
        return "Oi, meu nome é " + this.nomeUsuario + " e eu sou um " + 
        this.usuario + ".";
    }
}

console.log(pessoa.nomeUsuario);
console.log(pessoa.saudar());