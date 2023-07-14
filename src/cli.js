import chalk from "chalk"
// Recebe a função de outro arq.
import PegaArquivo from "./index.js"

// argv = valores de argumento, ou seja, a informação passada
// na linha de comando para dentro do programa
const caminho = process.argv

//Função precisa ser assícrona, por conta da outra
async function ProcessaArquivo(caminho){
    const resultado = await PegaArquivo(caminho[2])
    console.log(chalk.yellow('Lista de Links'), resultado)
}

ProcessaArquivo(caminho)

//Para executar o cli.js = node src/cli.js ./arquivos/texto.md