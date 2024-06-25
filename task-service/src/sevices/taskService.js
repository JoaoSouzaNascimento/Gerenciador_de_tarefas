const Tarefas = require("../models/taskModel")

async function list(queryParams) {
    return await Tarefas.findAll( { where: queryParams } )
}

async function create(dados) {
    let tarefa = dados
    tarefa.status = "pendente"
    
    return await Tarefas.create(tarefa)
}

async function update(idTarefa, dados) {
    const tarefaEncontrada = await Tarefas.findByPk(idTarefa)

    if(tarefaEncontrada){
        tarefaEncontrada.titulo = dados.titulo ?? tarefaEncontrada.titulo
        tarefaEncontrada.descricao = dados.descricao
        tarefaEncontrada.responsavelId = dados.responsavelId ?? tarefaEncontrada.responsavelId


        if(tarefaEncontrada.data_limite != dados.data_limite){
            tarefaEncontrada.data_limite = dados.data_limite  ?? tarefaEncontrada.data_limite
            tarefaEncontrada.data_conclusao = null
            tarefaEncontrada.status = 'pendente'
        }

        if(dados.data_conclusao){    
            let dados_data_conclusao = new Date(dados.data_conclusao);
            let tarefa_data_limite = new Date(tarefaEncontrada.data_limite);

            if(dados_data_conclusao <= tarefa_data_limite)  {
                tarefaEncontrada.status = 'entregue'
                tarefaEncontrada.data_conclusao = dados.data_conclusao
            } else {
                tarefaEncontrada.status = 'expirado'
                tarefaEncontrada.data_conclusao = null
            }
        }

        await tarefaEncontrada.save();
    }

    return tarefaEncontrada
}

async function remove(idTarefa) {
    const tarefaEncontrada = await Tarefas.findByPk(idTarefa)
    if(tarefaEncontrada)
        await tarefaEncontrada.destroy()

    return tarefaEncontrada
}

module.exports = {list, create, update, remove}