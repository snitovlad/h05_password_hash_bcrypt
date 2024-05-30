import { usersMongoRepository } from "../../repositories/users/user-mongo-repository"
import { usersService } from "../users/users-service"

export const authService = {

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersMongoRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) {
            return false
        }
        const passwordHash = await usersService.generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        }
        return true
    },
}