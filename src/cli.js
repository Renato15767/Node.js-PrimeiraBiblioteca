import chalk from "chalk"
import fs, { lstatSync } from 'fs'
// Recebe a função de outro arq.
import PegaArquivo from "./index.js"

// argv = valores de argumento, ou seja, a informação passada
// na linha de comando para dentro do programa
const caminho = process.argv

function ImprimiLista(resultado, nomeArquivo = ''){
    console.log(chalk.yellow('Lista de Links'),
    chalk.black.bgBlue(nomeArquivo),
    resultado)
}

//Função precisa ser assícrona, por conta da outra
async function ProcessaArquivo(argumentos){
    const caminho = argumentos[2]

    try{
        fs.lstatSync(caminho)
    }catch(erro){
        if(erro.code === 'ENOENT'){
            console.log('Arquivo ou diretório não existem')
            return
        }
    }

    // Verifica se o caminho é de um arquivo
    if(lstatSync(caminho).isFile()){
        const resultado = await PegaArquivo(argumentos[2])
        ImprimiLista(resultado)

    }else if(lstatSync(caminho).isDirectory()){
        // Código assíncrono e lê um diretório
        const arquivos = await fs.promises.readdir(caminho)
        // o forEach é assíncrono
        arquivos.forEach(async (nomeArquivo) => {
            // Manda caminho do arquivo para a Func. PegaArquivo
            const lista = await PegaArquivo(`${caminho}/${nomeArquivo}`)
            ImprimiLista(lista, nomeArquivo)
        })
    }
}

ProcessaArquivo(caminho)

//Para executar o cli.js = node src/cli.js ./arquivos/texto.md