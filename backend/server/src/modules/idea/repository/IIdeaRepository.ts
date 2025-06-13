import { Votes } from "../../../../infra/database/model/votes"
import { PaginationDTO } from "../../../defaultDTOs/PaginationDTO"
import { ResultsWrapper } from "../../../utils/ResultsWrapper"
import { CommentDTO } from "../dto/CommentDTO"
import { IdeaDTO } from "../dto/IdeaDTO"

export type OrderByIdeaParam = "latest" | "most_voted"

export interface IIdeaRepository{
    // Method responsible for inserting a voting record into the system
    createIdea(title: string, description: string, category: string, userId: number): Promise<ResultsWrapper<IdeaDTO>>
    // Method responsible for recording the vote on an idea
    createVote(ideaId: number, userId: number, liked: boolean): Promise<ResultsWrapper<IdeaDTO>>
    // Method responsible for recording a comment on an idea
    createComment(comment: string, ideaId: number, userId: number): Promise<ResultsWrapper<CommentDTO>>
    // Method responsible for listing highlighted ideas
    listHighlightIdeas(amount: number): Promise<ResultsWrapper<IdeaDTO[]>>
    // Method responsible for listing ideas according to parameters and returning paginated data
    listIdeas(orderBy: OrderByIdeaParam, page: number, limitPerPage: number, title ?: string): Promise<ResultsWrapper<PaginationDTO<IdeaDTO>>>
    // Method responsible for searching for an idea by id
    findIdeaById(ideaId: number): Promise<ResultsWrapper<IdeaDTO>>
    // Method responsible for listing the comments of an idea and returning the paginated data
    listComments(page: number, limitPerPage: number, ideaId: number): Promise<ResultsWrapper<PaginationDTO<CommentDTO>>>
    // Method responsible for updating the description of an idea
    updateIdeaDescription(ideaId: number, description: string): Promise<ResultsWrapper<boolean>>
    // Method responsible for updating the idea title
    updateIdeaTitle(ideaId: number, title: string): Promise<ResultsWrapper<boolean>>
    // Method responsible for deleting the idea
    deleteIdea(ideaId: number): Promise<ResultsWrapper<boolean>>
    // Method responsible for search vote by user and idea
    findVoteByIdeaAndUser(ideaId: number, userId: number): Promise<ResultsWrapper<Votes>>
}