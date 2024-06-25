const database = require("../database/taskDatabase")
const Sequelize = require("sequelize")

const Tarefas = database.define("tarefas", {
    id_tarefa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    responsavelId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    data_limite: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    data_conclusao: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    status: {
        type: Sequelize.ENUM,
        values: ['pendente', 'entregue', 'expirado'],
        allowNull: false
    }
}, {
    timestamp: true
})

module.exports = Tarefas