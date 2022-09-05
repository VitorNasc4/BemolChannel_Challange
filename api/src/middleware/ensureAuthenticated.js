const {verify} = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization // Armazena o token completo

    if (!authHeader) {
        throw new AppError("JWT Token não informado", 401)
    }

    const [, token] = authHeader.split(" ") // Armazena apenas o secret do token

    try {
        // Confere se token é valid (secret correto) e armazena o id do usuário (subject) no user_id
        const {sub : user_id} = verify(token, authConfig.jwt.secret) 

        request.user = { id: Number(user_id) } // Passa o id do usuário em Number para o request.user

        return next()
    } catch {
        throw new AppError("JWT Token inválido", 401)
    }
}

module.exports = ensureAuthenticated