import { SortDirection } from "mongodb"

export type UsersSanitizedQueryModel = {
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
    searchEmailTerm: string | null
    searchLoginTerm: string | null

}