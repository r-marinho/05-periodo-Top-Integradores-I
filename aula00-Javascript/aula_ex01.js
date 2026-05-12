//Exemplo 1
//Usando  var (escopo global/função)
/*
var nome = "Rafael";
console.log(nome);

if(true){
    var nome = "Maria";
    console.log(nome);
}
nome = 35.5
console.log(nome);

//LET
let idade = 34;
console.log(idade);

if(true){
    let idade = 35;
    console.log(idade);
}
//idade = 35.5
console.log(idade);

*/
//Usando const
const pi = 3.14;
console.log(pi);

if(true){
    const pi = 3.14159;
    console.log(pi);
}

//pi = 55;
console.log(pi);