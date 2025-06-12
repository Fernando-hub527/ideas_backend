import { Comment } from "../../../../infra/database/model/comment"
import { UserDTO } from "../../user/dto/UserDTO"
import { IdeaDTO } from "./IdeaDTO"

export class CommentDTO{
    readonly id: number
    readonly comment: string
    readonly idea: IdeaDTO
    readonly author: UserDTO

    constructor(id: number, comment: string, idea: IdeaDTO, author: UserDTO){
        this.id = id
        this.comment = comment
        this.idea = idea
        this.author = author
    }

    static makeWithModel(comment: Comment){
        return new CommentDTO(comment.id, comment.comment, IdeaDTO.makeWithModel(comment.idea), UserDTO.makeWithModel(comment.user))
    }

    toResponse(){
        return {id: this.id, comment: this.comment, idea: this.idea.toResponse(), author: this.author.toResponse()}
    }
}