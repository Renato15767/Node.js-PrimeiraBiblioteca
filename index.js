//Importa chalk (precisa usar o NPM)
import chalk from 'chalk';
//FS é uma lib nativa do node.js, que permite acessar outros arq.
import fs from 'fs'

function TrataErro(erro){
    console.log(erro)
    //irá lançar o erro no terminal para ser tratado
    throw new Error(chalk.red(erro.code, "não há arquivo no diretório"))
}

function PegaArquivo(caminhoArq){
    const enconding = 'utf-8'

    //Lê o arquivo e pega seu conteúdo
    fs.readFile(caminhoArq, enconding, (erro, texto) =>{
        //Caso tenha algum erro, irá cair no if
        if(erro){
            TrataErro(erro)
        }
        console.log(chalk.green(texto))
    })
}

// ./ pega apartir do diretório que estamos trabalhando
PegaArquivo("./arquivos/texto.md")