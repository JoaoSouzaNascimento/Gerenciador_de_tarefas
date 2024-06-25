const Service = require("../sevices/taskService")
const kafka = require("../messaging/kafka/index")

const producer = kafka.producer();


function list(req, res) {
    Service.list(req.query)
        .then((tarefas) => {
            return res.send({ dados: tarefas })
        }), (error) => {
            return res.status(500).send({ message: error })
        }
}

function create(req, res) {
    Service.create(req.body)
        .then(async (tarefaCriada) => {
            const tarefaIDs = {
                id_tarefa: tarefaCriada.id_tarefa,
                responsavelId: tarefaCriada.responsavelId,
                titulo: tarefaCriada.titulo,
                descricao: tarefaCriada.descricao
            };

            await producer.connect();

            await producer.send({
                topic: 'task-topic',
                messages: [{ value: JSON.stringify(tarefaIDs) }],
            });

            console.log("Message sent successfully");
            await producer.disconnect();

            return res.status(201).send({
                message: "Nova tarefa criada com sucesso",
                tarefa: tarefaCriada
            })
        }, (error) => {
            return res.status(500).send({ message: error })
        })
}
function update(req, res) {
    data = req.body
    for (let key in data) {
        if (data[key] === "") {
          data[key] = null;
        }
    }
    Service.update(req.params.id, data)
        .then((tarefaEditada) => {
            if(!tarefaEditada)
                return res.send({ message: "Tarefa não foi encontrada"})

            return res.send({
                message: "Tarefa atualizada com sucesso",
                tarefa: tarefaEditada
            })
        }, (error) => {
            return res.status(500).send({ message: error })
        })
}

function remove(req, res) {
    Service.remove(req.params.id)
        .then((tarefaRemovida) => {
            if(!tarefaRemovida)
                return res.send({ message: "Tarefa não foi encontrada"})

            return res.send({
                message: "Tarefa removido com sucesso",
                tarefa: tarefaRemovida
            })
        }, (error) => {
            return res.status(500).send({ message: error })
        })
}

module.exports = {list, create, update, remove}