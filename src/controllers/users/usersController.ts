import { Response } from "express"
import { RequestWithQuery } from "../../models/requestTypes"
import { queryDefaulUsersValues } from "../../helper/queryDefaultValues"
import { UsersQueryModel } from "../../models/users-model/UsersQueryModel"
import { UsersViewModel } from "../../models/users-model/UsersViewModel"
import { usersQueryRepository } from "../../repositories/users/users-query-repository"

export const usersController = {
    async findAllUsers(
        req: RequestWithQuery<UsersQueryModel>, res: Response<UsersViewModel | { error: string }>) {
        const sanitizedQuery = queryDefaulUsersValues(req.query)

        const allUsers = await usersQueryRepository.findAllUsers(sanitizedQuery)
        res
            .status(200)
            .json(allUsers)
    }
}