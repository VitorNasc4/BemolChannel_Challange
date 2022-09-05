const { Router } = require("express")
const usersRoutes = require("./user.routes")
const sessionsRoutes = require("./session.routes")

const routes = Router()

routes.use("/user", usersRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes