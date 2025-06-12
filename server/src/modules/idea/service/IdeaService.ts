import { PaginationDTO } from "../../../defaultDTOs/PaginationDTO";
import { ErrorRegisterAlreadyRegistered } from "../../../error/ErrorRegisterAlreadyRegistered";
import { ResultsWrapper } from "../../../utils/ResultsWrapper";
import { IUserService } from "../../user/service/IUserService";
import { CommentDTO } from "../dto/CommentDTO";
import { IdeaDTO } from "../dto/IdeaDTO";
import { IIdeaRepository, OrderByIdeaParam } from "../repository/IIdeaRepository";
import { IIdeaService } from "./IIdea";

export class IdeaService implements IIdeaService{
    ideaRepository: IIdeaRepository

    constructor(ideaRepository: IIdeaRepository){
        this.ideaRepository = ideaRepository
    }

    createIdea(title: string, description: string, category: string, userId: number): Promise<ResultsWrapper<IdeaDTO>> {
        return this.ideaRepository.createIdea(title, description, category, userId)
    }
    
    async createVote(ideaId: number, userId: number): Promise<ResultsWrapper<IdeaDTO>> {
        const vote = await this.ideaRepository.findVoteByIdeaAndUser(ideaId, userId)
        if (vote.isSucess) return ResultsWrapper.fail(new ErrorRegisterAlreadyRegistered(vote.getValue().id.toString(), "vote"))
        return this.ideaRepository.createVote(ideaId, userId, true)
    }

    createComment(comment: string, ideaId: number, userId: number): Promise<ResultsWrapper<CommentDTO>> {
        return this.ideaRepository.createComment(comment, ideaId, userId)
    }

    listHighlightIdeas(amount: number): Promise<ResultsWrapper<IdeaDTO[]>> {
        return this.ideaRepository.listHighlightIdeas(amount)
    }

    listIdeas(orderBy: OrderByIdeaParam, page: number, limitPerPage: number, title?: string): Promise<ResultsWrapper<PaginationDTO<IdeaDTO>>> {
        return this.ideaRepository.listIdeas(orderBy, page, limitPerPage, title)
    }
    findIdeaById(ideaId: number): Promise<ResultsWrapper<IdeaDTO>> {
        return this.ideaRepository.findIdeaById(ideaId)
    }
    async listComments(page: number, limitPerPage: number, ideaId: number): Promise<ResultsWrapper<PaginationDTO<CommentDTO>>> {
        const idea = await this.ideaRepository.findIdeaById(ideaId)
        if (!idea.isSucess) return ResultsWrapper.fail(idea.getError())
            
        return this.ideaRepository.listComments(page, limitPerPage)
    }
    updateIdeaDescription(ideaId: number, description: string): Promise<ResultsWrapper<boolean>> {
        return this.ideaRepository.updateIdeaDescription(ideaId, description)
    }
    updateIdeaTitle(ideaId: number, title: string): Promise<ResultsWrapper<boolean>> {
        return this.ideaRepository.updateIdeaTitle(ideaId, title)
    }
    deleteIdea(ideaId: number): Promise<ResultsWrapper<boolean>> {
        return this.ideaRepository.deleteIdea(ideaId)
    }

}