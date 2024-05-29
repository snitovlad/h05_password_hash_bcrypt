import { userCollection } from "../../db/mongo-db"
import { UserDBType } from "../../db/db-type"
import { UsersSanitizedQueryModel } from "../../models/users-model/UsersSanitizedQueryModel"
import { UsersViewModel } from "../../models/users-model/UsersViewModel"
import { UserViewModel } from "../../models/users-model/UserViewModel"

export const usersQueryRepository = {

    async findAllUsers(sanitizedQuery: UsersSanitizedQueryModel): Promise<UsersViewModel | { error: string }> {
        // формирование фильтра (может быть вынесено во вспомогательный метод)
        //const byId = blogId ? { blogId: new ObjectId(blogId) } : {}

        const searchLoginTerm = sanitizedQuery.searchLoginTerm
            ? { name: { $regex: sanitizedQuery.searchLoginTerm, $options: 'i' } } //$options: 'i' - все равно какой регистр
            : {}

        const searchEmailTerm = sanitizedQuery.searchEmailTerm
            ? { name: { $regex: sanitizedQuery.searchEmailTerm, $options: 'i' } } //$options: 'i' - все равно какой регистр
            : {}


        const filter = {
            //...byId,
            //_id: { $in: [new ObjectId(someStringId), ...] },
            $or: [{ ...searchLoginTerm }, { ...searchEmailTerm }]
        }

        try {
            // собственно запрос в бд (может быть вынесено во вспомогательный метод)
            const items = await userCollection
                .find(filter)
                .sort(sanitizedQuery.sortBy, sanitizedQuery.sortDirection)
                .skip((sanitizedQuery.pageNumber - 1) * sanitizedQuery.pageSize)
                .limit(sanitizedQuery.pageSize)
                .toArray() as UserDBType[]

            // подсчёт элементов (может быть вынесено во вспомогательный метод)
            const totalCount = await userCollection.countDocuments(filter)

            // формирование ответа в нужном формате (может быть вынесено во вспомогательный метод)
            return {
                pagesCount: Math.ceil(totalCount / sanitizedQuery.pageSize),
                page: sanitizedQuery.pageNumber,
                pageSize: sanitizedQuery.pageSize,
                totalCount,
                items: items.map(this.mapToOutput)
            }
        } catch (e) {
            console.log(e)
            return { error: 'error with getting of users' }
        }
    },

    mapToOutput(user: UserDBType): UserViewModel {
        return {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt,
        }
    },

}
