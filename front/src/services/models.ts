export type NewIdea = {title: string, description: string, category: string}
export type NewComment = {comment: string, ideaId: number}
export type User = {name: string, email: string, password ?: string}
export type Pagination<T> = {currentPage: number, totalPages: number, itemsPerPage: number, totalItems: number, data: T[]}
export type Comment = {id: number, comment: string, ideaId: number, author: {name: string, id: number}}
export type Idea = {
    id: number, title: string, description: string, category: string, author: User, 
    createdAt: Date, liked: boolean, votes: number
}
