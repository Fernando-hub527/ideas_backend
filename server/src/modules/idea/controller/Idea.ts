import { Request, Response } from "express";
import { validateSchema } from "../../../utils/validator";
import {validCommentFilters, validIdeaDescription, validIdeaFilters, validIdeaId, validIdeaTitle, validNewComment, validNewIdea } from "../validators/ideaValidator";
import { title } from "process";
import { IIdeaService } from "../service/IIdea";

export class IdeaController{
    service: IIdeaService

    constructor(service: IIdeaService){
        this.service = service
    }

    async createIdea(req: Request, res: Response){
        const validation = validNewIdea(
            {title: req.body.title, description: req.body.description, category: req.body.category, userId: req.userId}
        )
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError().message); return}
        
        const data = validation.getValue()
        const createdIdea = await this.service.createIdea(data.title, data.description, data.category, data.userId)
        if (!createdIdea.isSucess) {res.status(createdIdea.getError().getStatus()).send(createdIdea.getError().name); return}

        res.status(201).send(createdIdea.getValue().toResponse())
    }

    async createVote(req: Request, res: Response){
        const validation = validIdeaId({ideaId: req.body.ideaId, userId: req.userId})
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError().name); return}
        
        const data = validation.getValue()
        const ideaVoted = await this.service.createVote(data.ideaId, data.userId)
        if (!ideaVoted.isSucess) {res.status(ideaVoted.getError().getStatus()).send(ideaVoted.getError().name); return}

        res.status(201).send(ideaVoted.getValue().toResponse())
    }

    async createIdeaComment(req: Request, res: Response){
        const validation = validNewComment({ideaId: req.body.ideaId, comment: req.body.comment, userId: req.userId})
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError().name); return}
        
        const data = validation.getValue()
        const createdComment = await this.service.createComment(data.comment, data.ideaId, data.userId)
        if (!createdComment.isSucess) {res.status(createdComment.getError().getStatus()).send(createdComment.getError().name); return}

        res.status(201).send(createdComment.getValue().toResponse())

    }

    async listHighlightIdeas(req: Request, res: Response){
        const ideas = await this.service.listHighlightIdeas(3)
        if (!ideas.isSucess) {res.status(ideas.getError().getStatus()).send(ideas.getError().name); return}

        res.status(200).send(ideas.getValue().map(idea => idea.toResponse()))
    }

    async listIdeas(req: Request, res: Response){
        const validation = validIdeaFilters(
            {orderBy: req.query.orderBy, title: req.query.title, page: req.query.page, limitPerPage: req.query.limit}
        )   
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError().name); return}
        
        const data = validation.getValue()
        const createdComment = await this.service.listIdeas(data.orderBy, data.page, data.limitPerPage, data.title)
        if (!createdComment.isSucess) {res.status(createdComment.getError().getStatus()).send(createdComment.getError().name); return}

        res.status(200).send(createdComment.getValue().toResponse())
    }

    async findIdeaById(req: Request, res: Response){
        const validation = validIdeaId({ideaId: req.params.ideaId, userId: req.userId})
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError().name); return}
        
        const response = await this.service.findIdeaById(validation.getValue().ideaId)
        if (!response.isSucess) {res.status(response.getError().getStatus()).send(validation.getError().name); return}

        res.status(200).send(response.getValue().toResponse())
    }

    async listCommentsById(req: Request, res: Response){
        const validation = validCommentFilters({page: req.query.page, limitPerPage: req.query.limit, ideaId: req.params.ideaId})   
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError().name); return}
        
        const data = validation.getValue()
        const createdComment = await this.service.listComments(data.page, data.limitPerPage, data.ideaId)
        if (!createdComment.isSucess) {res.status(createdComment.getError().getStatus()).send(createdComment.getError().name); return}

        res.status(200).send(createdComment.getValue().toResponse())
    }

    async updateIdeaDescription(req: Request, res: Response){
        const validation = validIdeaDescription({ideaId: req.body.ideaId, description: req.body.description})   
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError().name); return}
        
        const data = validation.getValue()
        const updatetedIdea = await this.service.updateIdeaDescription(data.ideaId, data.description)
        if (!updatetedIdea.isSucess) {res.status(updatetedIdea.getError().getStatus()).send(updatetedIdea.getError().name); return}

        res.status(204).send()
    }

   async  updateIdeaTitle(req: Request, res: Response){
        const validation = validIdeaTitle({ideaId: req.body.ideaId, title: req.body.title})   
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError().name); return}
          
        const data = validation.getValue()
        const updatetedIdea = await this.service.updateIdeaTitle(data.ideaId, data.title)
        if (!updatetedIdea.isSucess) {res.status(updatetedIdea.getError().getStatus()).send(updatetedIdea.getError().name); return}

        res.status(204).send()
    }

    async deleteIdea(req: Request, res: Response){
        const validation = validIdeaId({ideaId: req.params.ideaId, userId: req.userId})
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError().name); return}
        
        const response = await this.service.deleteIdea(validation.getValue().ideaId)
        if (!response.isSucess) {res.status(response.getError().getStatus()).send(response.getError().name); return}

        res.status(204).send()
    }
}