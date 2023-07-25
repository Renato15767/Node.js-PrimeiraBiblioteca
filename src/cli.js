import chalk from "chalk"
import fs, { lstatSync } from 'fs'
// Recebe a função de outro arq.
import PegaArquivo from "./index.js"
// Recebe a função de outro arq.
import ListaValidada from "./http-validacao.js"

// argv = valores de argumento, ou seja, a informação passada
// na linha de comando para dentro do programa
const caminho = process.argv

// É assícrona pq precisa esperar o resulta no http-valida.js
async function ImprimiLista(valida, resultado, nomeArquivo = ''){
    // Mostra a lista de links validada
    if(valida){
        console.log(chalk.yellow('Lista validada'),
        chalk.black.bgBlue(nomeArquivo),
        await ListaValidada(resultado))
    }else{
        //Mostra somente a lista de links
        console.log(chalk.yellow('Lista de Links'),
        chalk.black.bgBlue(nomeArquivo),
        resultado)
    }

    
}

//Função precisa ser assícrona, por conta da outra
async function ProcessaArquivo(argumentos){
    // Pega a 3ª posição do terminal
    const caminho = argumentos[2]
    // Se tiver '--valida' ele guarda True, se não ele guarda False
    const valida = argumentos[3] === '--valida'

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
        ImprimiLista(valida, resultado)

    }else if(lstatSync(caminho).isDirectory()){
        // Código assíncrono e lê um diretório
        const arquivos = await fs.promises.readdir(caminho)
        // o forEach é assíncrono
        arquivos.forEach(async (nomeArquivo) => {
            // Manda caminho do arquivo para a Func. PegaArquivo
            const lista = await PegaArquivo(`${caminho}/${nomeArquivo}`)
            ImprimiLista(valida, lista, nomeArquivo)
        })
    }
}

ProcessaArquivo(caminho)

//Para executar o cli.js = node src/cli.js ./arquivos/texto.md