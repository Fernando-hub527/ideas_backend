import { Idea } from "../../../../infra/database/model/Idea"
import { UserDTO } from "../../user/dto/UserDTO"

export class IdeaDTO{
    readonly id: number
    readonly title: string
    readonly description: string
    readonly category: string
    readonly author: UserDTO
    readonly createdAt: Date
    readonly liked: boolean
    readonly votes: number

    constructor(id:number, title: string, description: string, category: string, author: UserDTO, createdAt: Date, votes: number){
        this.id = id
        this.title = title
        this.description = description
        this.category = category
        this.author = author
        this.createdAt = createdAt
        this.votes = votes
        this.liked = false //TODO 
    }

    static makeWithModel(idea: Idea){
        return new IdeaDTO(
            idea.id, idea.title, idea.description, idea.category, UserDTO.makeWithModel(idea.author), idea.createdAt, idea.total_votes!
        )
    }

    toResponse(){
        return {
            id: this.id, title: this.title, description: this.description, category: this.category, 
            author: this.author.toResponse(), createdAt: this.createdAt, liked: this.liked, votes: this.votes}
    }

}