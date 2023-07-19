import chalk from "chalk"
import fs, { lstatSync } from 'fs'
// Recebe a função de outro arq.
import PegaArquivo from "./index.js"

// argv = valores de argumento, ou seja, a informação passada
// na linha de comando para dentro do programa
const caminho = process.argv

//Função precisa ser assícrona, por conta da outra
async function ProcessaArquivo(argumentos){
    const caminho = argumentos[2]

    // Verifica se o caminho é de um arquivo
    if(lstatSync(caminho).isFile()){
        const resultado = await PegaArquivo(argumentos[2])
        console.log(chalk.yellow('Lista de Links'), resultado)
    }

}

ProcessaArquivo(caminho)

//Para executar o cli.js = node src/cli.js ./arquivos/texto.md