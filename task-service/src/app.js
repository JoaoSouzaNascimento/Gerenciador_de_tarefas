require("dotenv").config({path:".env"})
require("./database/taskDatabase")
const express = require("express")
const taskRouter = require("./routes/taskRoutes")

const app = express()

app.use(express.json())
app.use("/tarefas", taskRouter)

app.listen(process.env.PORT || 3002 , console.log(`Servidor escutando na porta ${process.env.PORT}`))

module.exports = app