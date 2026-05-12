class Animal{
    constructor(nome, tipo){
        this.nome = nome;
        this.tipo = tipo;
    }

    exibirInformacoes(){
        return `Este é um ${this.tipo} chamado ${this.nome}`;
    }
}

const cachorro = new Animal("Duck","cachorro");
const gato = new Animal("Noel", "gato");

console.log(cachorro.exibirInformacoes());
console.log(gato.exibirInformacoes());