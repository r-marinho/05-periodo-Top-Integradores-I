# Aula prática de criptografia com OpenSSL no GitHub Codespaces

## Objetivos da aula

Ao final desta atividade, o aluno deverá ser capaz de:

- Explicar o conceito de criptografia na segurança da informação.
- Diferenciar criptografia simétrica, criptografia assimétrica e função de hash.
- Utilizar o OpenSSL no terminal do GitHub Codespaces.
- Cifrar e decifrar arquivos de texto e imagens.
- Gerar e verificar hashes para checar integridade de arquivos.
- Compreender a relação entre hash, autenticação e armazenamento seguro de senhas.

---

## 1. Introdução ao tema

A criptografia é um conjunto de técnicas usadas para proteger informações. Ela aparece em diversas situações do cotidiano digital, como acesso a sistemas, envio de mensagens, transações bancárias, armazenamento de arquivos e autenticação de usuários.

No contexto do desenvolvimento de software, compreender criptografia é essencial porque muitos sistemas dependem dela para:

- proteger dados em repouso, isto é, salvos em banco de dados, arquivos ou dispositivos;
- proteger dados em trânsito, isto é, enviados entre aplicações, servidores e clientes;
- validar a integridade de arquivos e mensagens;
- armazenar senhas de forma segura;
- permitir autenticação e assinatura digital.

Nesta aula, o foco estará em três conceitos fundamentais:

1. criptografia simétrica;
2. criptografia assimétrica;
3. funções de hash.

Depois da parte teórica, será apresentada uma prática com o OpenSSL no terminal do GitHub Codespaces.

---

## 2. Conceitos básicos de criptografia

### 2.1. O que é criptografia

Criptografia é o processo de transformar uma informação legível, chamada de texto em claro, em uma forma codificada, chamada de texto cifrado.

A ideia principal é que apenas pessoas autorizadas consigam recuperar o conteúdo original. Para isso, usa-se uma técnica matemática e uma chave criptográfica.

De forma simples:

- texto em claro: mensagem original;
- cifrar: transformar o texto em claro em texto cifrado;
- decifrar: recuperar o texto original a partir do texto cifrado;
- chave: informação secreta usada no processo criptográfico.

---

### 2.2. Criptografia simétrica

A criptografia simétrica utiliza a mesma chave para cifrar e decifrar.

#### Características principais

- A mesma chave é usada nas duas etapas.
- É mais rápida do que a criptografia assimétrica.
- É muito usada para proteger arquivos grandes, bancos de dados e volumes maiores de informação.
- O grande desafio é distribuir e guardar a chave com segurança.

#### Exemplo conceitual

Se uma pessoa cifra um arquivo com uma chave secreta, apenas outra pessoa que possua exatamente a mesma chave conseguirá decifrá-lo.

#### Algoritmos comuns

- AES.
- DES.
- 3DES.

O algoritmo mais conhecido e recomendado atualmente para fins didáticos e práticos é o AES, especialmente nas versões de 128, 192 ou 256 bits.

#### Quando usar

A criptografia simétrica é indicada quando existe necessidade de desempenho e quando as partes já compartilham uma chave secreta com segurança.

---

### 2.3. Criptografia assimétrica

A criptografia assimétrica utiliza um par de chaves:

- chave pública;
- chave privada.

A chave pública pode ser compartilhada com outras pessoas. A chave privada deve permanecer secreta.

#### Características principais

- O que é cifrado com a chave pública é decifrado com a chave privada correspondente.
- A chave pública pode ser divulgada.
- A chave privada deve ser protegida.
- É mais lenta do que a criptografia simétrica.
- É muito útil em autenticação, troca segura de chaves e assinatura digital.

#### Exemplo conceitual

Se um colega quiser lhe enviar uma mensagem secreta, ele pode usar sua chave pública para cifrá-la. Somente sua chave privada será capaz de decifrar essa mensagem.

#### Algoritmos comuns

- RSA.
- ECC.
- ElGamal.

Nesta aula, será usado o RSA por ser um dos algoritmos mais conhecidos em ambientes de estudo.

#### Quando usar

A criptografia assimétrica é útil quando não existe uma chave previamente compartilhada entre as partes. Ela também é amplamente usada para autenticação e assinatura digital.

---

### 2.4. Funções de hash

Hash não é criptografia no sentido de cifrar e decifrar. Hash é uma função matemática que recebe uma entrada e produz uma saída de tamanho fixo.

#### Características principais

- mesmo conteúdo gera o mesmo hash;
- uma pequena alteração no conteúdo muda completamente o resultado;
- não existe, na prática, um processo de decifração;
- serve para integridade e verificação de autenticidade.

#### Exemplos de algoritmos

- SHA-256;
- SHA-512;
- SHA-1;
- MD5.

Para segurança, SHA-256 e SHA-512 são opções mais apropriadas do que MD5 ou SHA-1, que já são considerados fracos para muitos cenários de segurança.

#### Usos comuns

- verificar se um arquivo foi alterado;
- validar downloads;
- armazenar senhas de forma protegida, em conjunto com salt e algoritmos apropriados;
- confirmar integridade de dados.

---

### 2.5. Diferença entre criptografia e hash

A diferença principal é que a criptografia foi criada para proteger o conteúdo e permitir sua recuperação posterior. Já o hash foi criado para gerar uma impressão digital do conteúdo.

#### Criptografia

- transforma o conteúdo em forma secreta;
- permite retornar ao conteúdo original;
- depende de chave;
- serve para confidencialidade.

#### Hash

- transforma o conteúdo em um resumo;
- não permite recuperar o conteúdo original;
- não usa uma chave criptográfica, em sua forma básica;
- serve para integridade e verificação.

---

## 3. Ambiente de prática: GitHub Codespaces

O GitHub Codespaces fornece um ambiente de desenvolvimento em nuvem com terminal Linux, editor de código e integração com repositórios GitHub.

Nesta aula, o Codespaces será usado para executar os comandos do OpenSSL diretamente no terminal.

### 3.1. Estrutura sugerida do repositório

Uma estrutura simples pode ser:

```text
criptografia-basica/
├── simetrica/
├── assimetrica/
├── hash/
└── README.md
```

Cada pasta será usada em uma etapa da atividade.

- `simetrica`: arquivos e chaves para criptografia simétrica.
- `assimetrica`: arquivos e chaves para criptografia assimétrica.
- `hash`: arquivos para geração e conferência de hash.

---

### 3.2. Verificando se o OpenSSL está instalado

No terminal do Codespaces, execute:

```bash
openssl version
```

Se o OpenSSL estiver instalado, será exibida a versão do programa.

Caso o comando não exista, instale com:

```bash
sudo apt update
sudo apt install -y openssl
```

Depois, teste novamente:

```bash
openssl version
```

---

## 4. Prática 1: criptografia simétrica com OpenSSL

Nesta etapa, será utilizado o AES para cifrar e decifrar mensagens de texto e imagens.

### 4.1. Criando a pasta de trabalho

```bash
mkdir -p simetrica
cd simetrica
```

### 4.2. Criando um arquivo de texto simples

```bash
echo "Mensagem secreta para teste de criptografia simétrica." > mensagem.txt
```

Esse arquivo será usado como entrada para o processo de cifragem.

---

### 4.3. Gerando uma chave simétrica

Para usar criptografia simétrica, precisamos de uma chave secreta.

Uma forma simples de gerar uma chave aleatória é:

```bash
openssl rand -out chave.bin 32
```

Explicação:

- `openssl rand`: gera dados aleatórios;
- `-out chave.bin`: salva a saída em um arquivo;
- `32`: quantidade de bytes gerados.

Esse arquivo conterá a chave usada na cifragem e na decifragem.

#### Observação importante

Esse arquivo deve ser protegido. Quem tiver acesso a ele poderá decifrar os arquivos cifrados com a mesma chave.

---

### 4.4. Cifrando um arquivo de texto

Use o comando:

```bash
openssl enc -aes-256-cbc -salt \
  -in mensagem.txt \
  -out mensagem.txt.enc \
  -pass file:chave.bin
```

#### Explicação do comando

- `openssl enc`: comando de cifragem de arquivos;
- `-aes-256-cbc`: algoritmo AES com chave de 256 bits no modo CBC;
- `-salt`: adiciona um valor aleatório para reforçar a segurança;
- `-in mensagem.txt`: arquivo original;
- `-out mensagem.txt.enc`: arquivo cifrado gerado;
- `-pass file:chave.bin`: usa o conteúdo do arquivo como base para a chave.

Depois da execução, o arquivo `mensagem.txt.enc` conterá dados cifrados e não será legível em formato normal.

---

### 4.5. Decifrando o arquivo de texto

Para recuperar o conteúdo original:

```bash
openssl enc -d -aes-256-cbc \
  -in mensagem.txt.enc \
  -out mensagem_decifrada.txt \
  -pass file:chave.bin
```

#### Explicação do comando

- `-d`: indica decifragem;
- os demais parâmetros são os mesmos usados na cifragem;
- a saída será gravada em `mensagem_decifrada.txt`.

Para conferir o conteúdo:

```bash
cat mensagem_decifrada.txt
```

O texto exibido deve ser igual ao texto original.

---

### 4.6. Cifrando e decifrando uma imagem

O processo também funciona com arquivos binários, como imagens.

Primeiro, coloque uma imagem dentro da pasta `simetrica`. Por exemplo, `imagem.png`.

Depois, cifre a imagem:

```bash
openssl enc -aes-256-cbc -salt \
  -in imagem.png \
  -out imagem.png.enc \
  -pass file:chave.bin
```

Agora, decifre a imagem:

```bash
openssl enc -d -aes-256-cbc \
  -in imagem.png.enc \
  -out imagem_recuperada.png \
  -pass file:chave.bin
```

Se o processo estiver correto, o arquivo `imagem_recuperada.png` será idêntico ao original.

---

### 4.7. Conceitos que devem ser destacados aos alunos

Nesta prática, vale enfatizar:

- a mesma chave foi usada para cifrar e decifrar;
- o arquivo cifrado não pode ser lido diretamente;
- qualquer pessoa sem a chave não consegue recuperar o conteúdo;
- o AES é rápido e adequado para dados maiores;
- a chave precisa ser preservada com cuidado.

---

## 5. Prática 2: criptografia assimétrica com OpenSSL

Nesta etapa, será utilizado RSA para demonstrar o uso de chave pública e chave privada.

### 5.1. Criando a pasta de trabalho

```bash
cd ..
mkdir -p assimetrica
cd assimetrica
```

### 5.2. Criando um arquivo de texto

```bash
echo "Mensagem secreta para teste de criptografia assimétrica." > mensagem.txt
```

---

### 5.3. Gerando a chave privada

```bash
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
```

#### Explicação

- `genpkey`: gera uma chave privada;
- `-algorithm RSA`: define o algoritmo RSA;
- `-out private.pem`: arquivo de saída da chave privada;
- `rsa_keygen_bits:2048`: define o tamanho da chave.

A chave privada deve ser guardada em segurança.

---

### 5.4. Gerando a chave pública

A chave pública é obtida a partir da chave privada:

```bash
openssl rsa -pubout -in private.pem -out public.pem
```

#### Explicação

- `-pubout`: exporta somente a chave pública;
- `-in private.pem`: lê a chave privada como base;
- `-out public.pem`: salva a chave pública.

A chave pública pode ser compartilhada.

---

### 5.5. Cifrando com a chave pública

```bash
openssl pkeyutl -encrypt \
  -inkey public.pem -pubin \
  -in mensagem.txt \
  -out mensagem_rsa.enc
```

#### Explicação

- `pkeyutl`: utilitário para operações com chaves;
- `-encrypt`: indica cifragem;
- `-inkey public.pem -pubin`: usa a chave pública;
- `-in mensagem.txt`: arquivo de entrada;
- `-out mensagem_rsa.enc`: arquivo cifrado.

---

### 5.6. Decifrando com a chave privada

```bash
openssl pkeyutl -decrypt \
  -inkey private.pem \
  -in mensagem_rsa.enc \
  -out mensagem_rsa_decifrada.txt
```

#### Explicação

- `-decrypt`: indica decifragem;
- `-inkey private.pem`: usa a chave privada;
- a saída conterá a mensagem original.

Para verificar:

```bash
cat mensagem_rsa_decifrada.txt
```

---

### 5.7. Observações importantes sobre RSA

O RSA não é a melhor escolha para arquivos grandes. Em aplicações reais, ele costuma ser usado para cifrar uma chave simétrica, e não para cifrar todo o conteúdo.

Uma prática comum é:

1. gerar uma chave simétrica;
2. cifrar o arquivo grande com AES;
3. cifrar a chave AES com RSA;
4. enviar os dois itens;
5. o destinatário usa RSA para recuperar a chave AES e depois usa AES para recuperar o arquivo.

Esse modelo é muito usado em sistemas reais porque combina desempenho e segurança.

---

## 6. Prática 3: hash e verificação de integridade

Nesta etapa, será demonstrado como gerar e conferir hashes.

### 6.1. Criando a pasta de trabalho

```bash
cd ..
mkdir -p hash
cd hash
```

### 6.2. Criando um arquivo de texto

```bash
echo "Conteúdo para cálculo de hash." > mensagem.txt
```

---

### 6.3. Gerando o hash SHA-256

```bash
openssl dgst -sha256 mensagem.txt
```

Esse comando exibirá um valor semelhante a:

```text
SHA2-256(mensagem.txt)= 3f6c...
```

Esse resultado é o resumo criptográfico do arquivo.

---

### 6.4. Salvando o hash em um arquivo

```bash
openssl dgst -sha256 mensagem.txt > mensagem.sha256.txt
```

Esse arquivo conterá o resultado do hash em formato textual.

---

### 6.5. Entendendo por que o hash serve para integridade

Se o arquivo mudar, mesmo em uma pequena parte, o hash também mudará.

Por exemplo:

```bash
echo "Alteração no arquivo." >> mensagem.txt
openssl dgst -sha256 mensagem.txt
```

O novo hash será diferente do hash anterior.

Isso permite detectar alterações, substituições ou corrupção de dados.

---

## 7. Como verificar o hash de forma simples

Muitos alunos confundem a geração do hash com a verificação da integridade. O OpenSSL gera o hash, mas a comparação entre o valor esperado e o valor atual precisa ser feita por um comando adicional.

### 7.1. Verificação manual

Imagine que você já tem o hash salvo em `mensagem.sha256.txt`.

Agora, gere o hash atual novamente:

```bash
openssl dgst -sha256 mensagem.txt
```

Compare esse valor com o valor salvo anteriormente.

Se forem iguais, o arquivo não foi alterado.

Se forem diferentes, o arquivo foi modificado.

---

### 7.2. Verificação com script Bash

Para automatizar a comparação, use um script.

Crie um arquivo chamado `verifica_integridade.sh` com o conteúdo:

```bash
#!/usr/bin/env bash

HASH_ANTIGO=$(awk '{print $2}' mensagem.sha256.txt)
HASH_ATUAL=$(openssl dgst -sha256 mensagem.txt | awk '{print $2}')

if [ "$HASH_ANTIGO" = "$HASH_ATUAL" ]; then
  echo "OK: arquivo íntegro"
else
  echo "ALERTA: arquivo modificado"
fi
```

#### Explicação do script

- `awk '{print $2}'`: extrai apenas o hash, ignorando o nome do arquivo e o texto do comando;
- `HASH_ANTIGO`: guarda o hash salvo;
- `HASH_ATUAL`: calcula o hash novamente;
- `if`: compara os valores;
- `echo`: exibe a mensagem final.

---

### 7.3. Como executar o script

Salve o arquivo como texto puro, com extensão `.sh`.

Depois, torne-o executável:

```bash
chmod +x verifica_integridade.sh
```

Em seguida, execute:

```bash
./verifica_integridade.sh
```

#### Onde esse código deve ser executado

Esse código pode ser executado diretamente no terminal do Codespaces.

Também é possível salvá-lo em um arquivo `.sh` para reutilizar sempre que necessário.

---

### 7.4. Existe um comando mais simples no OpenSSL?

O OpenSSL, isoladamente, gera o hash, mas não realiza a comparação automática entre um valor salvo e um valor recém-gerado.

Por isso, para verificar integridade, é comum combinar o OpenSSL com um pequeno script em Bash.

Em resumo:

- OpenSSL calcula o hash;
- o script compara os valores;
- o resultado informa se o arquivo foi alterado.

---

## 8. Hash, integridade e senhas

Uma aplicação muito importante de hash está no armazenamento de senhas.

### 8.1. O que não deve ser feito

Nunca se deve armazenar senha em texto puro.

Também não é recomendado guardar apenas um hash simples de senha sem outras medidas de proteção.

### 8.2. O que é recomendado

Em sistemas reais, o armazenamento de senha deve usar:

- hash apropriado para senhas;
- salt;
- algoritmo resistente a ataques por força bruta e por tabela pré-calculada.

Algoritmos como bcrypt, scrypt e Argon2 são amplamente utilizados para esse fim.

### 8.3. Relação com a aula

A compreensão de hash é o primeiro passo para entender por que senhas não devem ser armazenadas de forma simples.

Mais adiante, ao estudar autenticação, o aluno verá que o sistema não precisa armazenar a senha original. Ele armazena uma representação segura dela.

---

## 9. Roteiro sugerido de execução da prática

### Etapa 1. Preparação

1. Abrir o repositório no GitHub Codespaces.
2. Confirmar a instalação do OpenSSL.
3. Criar as pastas `simetrica`, `assimetrica` e `hash`.

### Etapa 2. Criptografia simétrica

1. Criar um arquivo de texto.
2. Gerar uma chave aleatória.
3. Cifrar o arquivo com AES.
4. Decifrar o arquivo.
5. Repetir com uma imagem.

### Etapa 3. Criptografia assimétrica

1. Gerar chave privada RSA.
2. Extrair chave pública.
3. Cifrar uma mensagem com a chave pública.
4. Decifrar com a chave privada.

### Etapa 4. Hash

1. Criar um arquivo de texto.
2. Gerar o hash SHA-256.
3. Alterar o arquivo.
4. Gerar o hash novamente e comparar.

### Etapa 5. Fechamento

1. Revisar as diferenças entre os três conceitos.
2. Discutir aplicações em segurança da informação.
3. Introduzir o tema de autenticação e armazenamento seguro de senhas.

---

## 10. Resumo comparativo

| Conceito | Usa chave? | Permite recuperar o original? | Finalidade principal |
|----------|------------|-------------------------------|----------------------|
| Criptografia simétrica | Sim, uma única chave | Sim | Confidencialidade e proteção de dados |
| Criptografia assimétrica | Sim, par de chaves | Sim | Troca segura, autenticação e assinatura |
| Hash | Não, no sentido clássico | Não | Integridade e verificação |

---

## 11. Boas práticas para a atividade

- Nunca versionar chaves privadas em repositório público.
- Usar nomes de arquivos claros e organizados.
- Trabalhar com exemplos pequenos no início.
- Explicar que hash não é o mesmo que criptografia.
- Reforçar que a segurança depende também do comportamento do usuário e da organização dos arquivos.
- Pedir que os alunos façam testes alterando os arquivos para observar a mudança no hash.
- Orientar os alunos a comparar os resultados originais e os resultados alterados.

---

## 12. Exercícios propostos

### Exercício 1

Criar um arquivo de texto com uma frase livre, cifrar com AES e depois decifrar.

### Exercício 2

Gerar um par de chaves RSA e cifrar uma mensagem curta com a chave pública.

### Exercício 3

Gerar o hash de um arquivo de imagem e verificar se ele muda após qualquer alteração.

### Exercício 4

Criar um script Bash para verificar integridade automaticamente.

### Exercício 5

Responder por escrito:

- o que é criptografia simétrica;
- o que é criptografia assimétrica;
- o que é hash;
- por que senhas não devem ser armazenadas em texto puro.

---

## 13. Conclusão

A prática proposta permite que o aluno compreenda, de forma progressiva, três fundamentos essenciais da segurança da informação:

- a criptografia simétrica, que usa uma chave secreta única;
- a criptografia assimétrica, que trabalha com chave pública e chave privada;
- a função de hash, usada para verificar integridade e apoiar o armazenamento seguro de informações.

Ao utilizar o OpenSSL no terminal do GitHub Codespaces, o estudante consegue visualizar na prática como esses conceitos funcionam. Essa base será importante para as próximas aulas sobre autenticação, segurança de senhas e proteção de dados em aplicações.

---

## 14. Comandos principais usados na aula

### Criptografia simétrica

```bash
openssl rand -out chave.bin 32
openssl enc -aes-256-cbc -salt -in mensagem.txt -out mensagem.txt.enc -pass file:chave.bin
openssl enc -d -aes-256-cbc -in mensagem.txt.enc -out mensagem_decifrada.txt -pass file:chave.bin
```

### Criptografia assimétrica

```bash
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private.pem -out public.pem
openssl pkeyutl -encrypt -inkey public.pem -pubin -in mensagem.txt -out mensagem_rsa.enc
openssl pkeyutl -decrypt -inkey private.pem -in mensagem_rsa.enc -out mensagem_rsa_decifrada.txt
```

### Hash

```bash
openssl dgst -sha256 mensagem.txt
openssl dgst -sha256 mensagem.txt > mensagem.sha256.txt
```

### Verificação com Bash

```bash
HASH_ANTIGO=$(awk '{print $2}' mensagem.sha256.txt)
HASH_ATUAL=$(openssl dgst -sha256 mensagem.txt | awk '{print $2}')

if [ "$HASH_ANTIGO" = "$HASH_ATUAL" ]; then
  echo "OK: arquivo íntegro"
else
  echo "ALERTA: arquivo modificado"
fi
```

---

## 15. Observações finais

Este roteiro foi organizado para uso em aula prática com apoio de terminal e ambiente Codespaces.

A proposta permite ao professor conduzir a parte conceitual e, em seguida, demonstrar a prática de forma objetiva, passo a passo, com exemplos simples e aplicáveis.

O material também pode ser adaptado para atividades em dupla, exercícios avaliativos ou aula demonstrativa com laboratório guiado.
