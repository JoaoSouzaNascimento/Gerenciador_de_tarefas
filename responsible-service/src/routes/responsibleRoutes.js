const express = require("express")
const controller = require("../controllers/responsibleController")
const middlewaresResponsaveis = require("../middlewares/responsibleMiddleware")

const router = express.Router()

router.get("/", controller.list)
router.get("/sem-tarefas-atribuidas", controller.listResponsaveisSemTarefasAtribuidas)
router.post("/", middlewaresResponsaveis.checkNome, middlewaresResponsaveis.checkData, controller.create)
router.put("/:id", middlewaresResponsaveis.haveNome, middlewaresResponsaveis.haveData, controller.update)
router.delete("/:id", controller.remove)

module.exports = router