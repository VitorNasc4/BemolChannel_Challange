const { hash, compare } = require("bcryptjs")

const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")
const { use } = require("express/lib/router")

class UsersController {
    async create(request, response) {
        const { name, email, password, cep, city, address} = request.body

        const database = await sqliteConnection()
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (checkUserExists) {
            throw new AppError("Este e-mail já está em uso") 
        }

        const hashedPassword = await hash(password, 8)
        
        await database.run("INSERT INTO users (name, email, password, cep, city, address) VALUES (?, ?, ?, ?, ?, ?)", [name, email, hashedPassword, cep, city, address])

        return response.status(201).json()
    }

    async update(request, response) {
        const { name, cep, city, address, email, password, old_password } = request.body
        const user_id = request.user.id

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

        if (!user) {
            throw new AppError("Usuário não encontrado")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este email já está em uso")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if (password && !old_password) {
            throw new AppError("Você precisa digitar a senha antiga")
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if (!checkOldPassword) {
                throw new AppError("A senha antiga está incorreta")
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
            UPDATE users SET
            name = (?),
            email = (?),
            password = (?),
            cep = (?),
            city = (?),
            address = (?),
            updated_at = DATETIME('now')
            WHERE id = (?)`,
            [user.name, user.email, user.password, user.cep, user.city, user.address, user_id]
            )

        return response.json()
    }
}

module.exports = UsersController