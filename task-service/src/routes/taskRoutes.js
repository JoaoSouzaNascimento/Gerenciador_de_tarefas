const express = require("express")
const controller = require("../controllers/taskController")
const middlewaresTarefas = require("../middlewares/taskMiddleware")

const router = express.Router()

router.get("/", controller.list)
router.post("/", middlewaresTarefas.checkTitulo, middlewaresTarefas.checkDataLimite, middlewaresTarefas.checkResponsavelId, controller.create)
router.put("/:id", middlewaresTarefas.checkTitulo, middlewaresTarefas.checkResponsavelId, controller.update)
router.delete("/:id", controller.remove)

module.exports = router