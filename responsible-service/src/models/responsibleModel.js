const database = require("../databases/responsibleDatabase")
const Sequelize = require("sequelize")

const Responsaveis = database.define("responsaveis", {
    id_responsavel: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail:true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
}, {
    timestamp: true
})

module.exports = Responsaveis