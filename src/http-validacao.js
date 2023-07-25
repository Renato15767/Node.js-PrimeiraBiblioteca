import chalk from "chalk"

function ExtraiLinks(arrLinks){
    // Pega somente os valores dos arrays e retorna como string
    // map(): faz a filtragem
    // Object.values(): Pega somente os valores do Objeto
    // join(): transforma em String os valores do array
    return arrLinks.map((objetoLink) => (Object.values(objetoLink).join()))
}

async function ChecaStatus(listaURLs){
    // fetch(): Método para mexer com pipelines do HTTP
    // Promise: faz promesa/assícrono.
    // .all(): permite receber, resolver e devolver uma lista de promessas
    // .status: pega a resposta http
    const arrStatus = await Promise
    .all(
        listaURLs.map(async (url) => {
            try{
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}`
            }catch(erro){
                // Retorna a função, caso de problema na URL
                return ManejaErros(erro)
            }
        })
    )
    return arrStatus
}

// Irá retornar uma string, caso de algum erro na URL
function ManejaErros(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado'
    }else{
        return 'Ocorreu um erro'
    }
}

// listaDeLinks são os Links sem validação
export default async function ListaValidada(listaDeLinks){
    const links =  ExtraiLinks(listaDeLinks)
    const status = await ChecaStatus(links)

    // Entre "()", depois do "=>" indica que irá retornar um objeto
    return listaDeLinks.map((objeto, indice) => ({
        // ...: espalha/quebra/divide o objeto. EX: [[1],[2]] -> [1,2]
        ...objeto,
        // define a chave "status" com os status HTTP de acordo com o indice do array
        status: status[indice]
    }))
}

