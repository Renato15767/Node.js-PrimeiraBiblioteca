//Importa chalk (precisa usar o NPM)
import chalk from 'chalk';
//FS é uma lib nativa do node.js, que permite acessar outros arq.
import fs from 'fs'

const textoTeste = 'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).'

function ExtraiLinks(texto){
    //Expressão regular
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = regex.exec(texto);
    console.log(chalk.green(capturas));
}

ExtraiLinks(textoTeste)

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


// ./ pega apartir do diretório que estamos trabalhando
//PegaArquivo("./arquivos/texto.md")


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

// Expressões regulares
// \[[^[\]]*?\]
// \(https?:\/\/[^\s?#.].[^\s]*\)
// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)