//Importa chalk (precisa usar o NPM)
import chalk from 'chalk';
//FS é uma lib nativa do node.js, que permite acessar outros arq.
import fs from 'fs'


function ExtraiLinks(texto){
    //Expressão regular
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    //... = Irá espalhar o conteúdo no array ([])
    //matchAll(): ele retorna um iterável. Combina todas as referências encontradas
    const capturas = [...texto.matchAll(regex)];
    //map(): Percorre o array e retorna outro com o resu que queremos
    //
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo'
}

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
        return ExtraiLinks(texto)

        //catch pega os erros
    }catch (erro){
        TrataErro(erro)
        //finally sempre é executado
    }finally{
        console.log(chalk.yellow('operação concluída'));
    }
    
}


// ./ pega apartir do diretório que estamos trabalhando
export default PegaArquivo


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