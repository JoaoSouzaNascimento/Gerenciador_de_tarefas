require("dotenv").config({path:".env"})
const express = require("express")
const responsibleRouter = require("./routes/responsibleRoutes")

const app = express()

app.use(express.json())
app.use("/responsaveis", responsibleRouter)

app.listen(process.env.PORT || 3001 , console.log(`Servidor escutando na porta ${process.env.PORT}`))

module.exports = app