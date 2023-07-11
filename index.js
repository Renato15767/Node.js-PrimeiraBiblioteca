//Importa chalk (precisa usar o NPM)
import chalk from 'chalk';
//FS é uma lib nativa do node.js, que permite acessar outros arq.
import fs from 'fs'

function TrataErro(erro){
    console.log(erro)
    //irá lançar o erro no terminal para ser tratado
    throw new Error(chalk.red(erro.code, "não há arquivo no diretório"))
}


// async/await

// async deixa a função assíncrona
async function PegaArquivo(caminhoArq){
    //Try é executado primeiro
    try{
        const enconding = 'utf-8'
        // Faz com que o trecho do cód. aguarde o retorno
        const texto = await fs.promises.readFile(caminhoArq, enconding)
        console.log(chalk.green(texto))
        //catch pega os erros
    }catch (erro){
        TrataErro(erro)
        //finally sempre é executado
    }finally{
        console.log(chalk.yellow('operação concluída'));
    }
    
}


// promises com then()

// function PegaArquivo(caminhoArq){
//     const enconding = 'utf-8'
//     //promises = código assícrono. Ele promete que irá fazer
//     fs.promises.readFile(caminhoArq, enconding)
//         //then encadea código assíncrono, ou seja, faz uma coisa e manda fazer outra ao mesmo tempo.
//         //texto é o arq. que vai ser recebido
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(TrataErro)
// }



// ./ pega apartir do diretório que estamos trabalhando
PegaArquivo("./arquivos/texto.md")
PegaArquivo("./arquivos/")