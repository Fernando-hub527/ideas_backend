import { Like } from "typeorm";
import { AppDataSource } from "../../../../infra/database/data-source";
import { Comment } from "../../../../infra/database/model/comment";
import { Idea } from "../../../../infra/database/model/Idea";
import { User } from "../../../../infra/database/model/user";
import { Votes } from "../../../../infra/database/model/votes";
import { PaginationDTO } from "../../../defaultDTOs/PaginationDTO";
import { IError } from "../../../error/IError";
import { InternalError } from "../../../error/InternalError";
import { ResultsWrapper } from "../../../utils/ResultsWrapper";
import { CommentDTO } from "../dto/CommentDTO";
import { IdeaDTO } from "../dto/IdeaDTO";
import { IIdeaRepository, OrderByIdeaParam } from "./IIdeaRepository";
import { ErrorRegisterNotFound } from "../../../error/ErrorRegisterNotFound";

export class IdeaRepository implements IIdeaRepository{

    async createIdea(title: string, description: string, category: string, userId: number): Promise<ResultsWrapper<IdeaDTO>> {
        try {
            const createdIdea = await AppDataSource.getRepository(Idea).save(new Idea(title, description, category, {id: userId} as User))
            return this.findIdeaById(createdIdea.id)
        } catch (error) {
            return ResultsWrapper.fail<IdeaDTO>(new InternalError("could not create ideas", error as IError))
        }
    }

    async createVote(ideaId: number, userId: number, liked: boolean): Promise<ResultsWrapper<IdeaDTO>> {
        try {
            const ideaFound = await AppDataSource.getRepository(Idea).findOneBy({id: ideaId})
            if(!ideaFound) return ResultsWrapper.fail(new ErrorRegisterNotFound(ideaId.toString() ,"idea"))

            const createdUser = await AppDataSource.getRepository(Votes).save(new Votes(ideaFound, liked, {id: userId} as User), {})
            return ResultsWrapper.ok(IdeaDTO.makeWithModel(createdUser.idea))
        } catch (error) {
            return ResultsWrapper.fail<IdeaDTO>(new InternalError("could not create votes", error as IError))
        }
    }

    async createComment(comment: string, ideaId: number, userId: number): Promise<ResultsWrapper<CommentDTO>> {
        try {
            const ideaFound = await AppDataSource.getRepository(Idea).findOneBy({id: ideaId})
            if(!ideaFound) return ResultsWrapper.fail(new ErrorRegisterNotFound(ideaId.toString() ,"idea"))

            const createdComment = await AppDataSource.getRepository(Comment).save(new Comment(ideaFound, comment, {id: userId} as User))
            return ResultsWrapper.ok(CommentDTO.makeWithModel(createdComment))
        } catch (error) {
            return ResultsWrapper.fail<CommentDTO>(new InternalError("could not create comments", error as IError))
        }
    }

    async listHighlightIdeas(amount: number): Promise<ResultsWrapper<IdeaDTO[]>> {
        try {
              const ideas = await AppDataSource.getRepository(Idea)
                .createQueryBuilder("i")
                .leftJoin("i.votes", "v")
                .leftJoinAndSelect("i.author", "author")
                .select("i")
                .addSelect("author")
                .addSelect("COUNT(v.id)", "total_votes")
                .groupBy("i.id, author.id")
                .orderBy("total_votes", "DESC")
                .limit(amount)
                .getRawAndEntities();
          
            return ResultsWrapper.ok(ideas.entities.map((idea, index) => {
                idea.total_votes = parseInt(ideas.raw[index]["total_votes"])
                return IdeaDTO.makeWithModel(idea)
            }));
        } catch (error) {
            return ResultsWrapper.fail<IdeaDTO[]>(new InternalError("Unable list highlight ideas", error as IError))
        }
    }

    async listIdeas(orderBy: OrderByIdeaParam, page: number, limitPerPage: number, title?: string): Promise<ResultsWrapper<PaginationDTO<IdeaDTO>>> {
        try {
            let query = orderBy == "latest" ? this.makeQueryToLatestIdeas() : this.makeQueryToMostVotesIdeas()
            if(title) query = query.where({title: Like(`%${title}%`)})
            
            const [ideas, total] = await query.skip((page - 1) * limitPerPage).take(limitPerPage).getManyAndCount();
            const ideasDto = ideas.map(idea => IdeaDTO.makeWithModel(idea))

            return ResultsWrapper.ok(new PaginationDTO<Idea>(ideasDto, page, limitPerPage, Math.ceil(total / limitPerPage), total))
        } catch (error) {
            return ResultsWrapper.fail(new InternalError("Unable list ideas", error as IError))
        }
    }

    private makeQueryToMostVotesIdeas(){
        return AppDataSource.getRepository(Idea)
            .createQueryBuilder("i")
            .leftJoin("i.votes", "v")
            .leftJoinAndSelect("i.author", "author")
            .select("i")
            .addSelect("author")
            .addSelect("COUNT(v.id)", "total_votes")
            .groupBy("i.id, author.id")
            .orderBy("total_votes", "DESC")  
    }

    private makeQueryToLatestIdeas(){
        return AppDataSource.getRepository(Idea)
            .createQueryBuilder("i")
            .leftJoinAndSelect("i.author", "author")
            .orderBy("i.createdAt", "DESC")  
    }

    async findIdeaById(ideaId: number): Promise<ResultsWrapper<IdeaDTO>> {
        try {
            const ideaFound = await AppDataSource.getRepository(Idea)
                .createQueryBuilder('idea')
                .leftJoin('idea.votes', 'vote')
                .leftJoinAndSelect('idea.author', 'author')
                .addSelect('COUNT(vote.id)', 'voteCount')
                .where('idea.id = :id', { id: ideaId })
                .groupBy('idea.id')
                .addGroupBy('author.id') 
                .getOne();

            if(!ideaFound) return ResultsWrapper.fail<IdeaDTO>(new ErrorRegisterNotFound(ideaId.toString() ,"idea"))
             
            return ResultsWrapper.ok(IdeaDTO.makeWithModel(ideaFound));
         } catch (error) {
            return ResultsWrapper.fail(new InternalError("Unable to complete user search by id", error as IError))
         }
    }

    async listComments(page: number, limitPerPage: number): Promise<ResultsWrapper<PaginationDTO<CommentDTO>>> {
        try {
            const skip = (page - 1) * limitPerPage
            const [comments, total] = await AppDataSource.getRepository(Comment).findAndCount({
                skip: skip,
                take: limitPerPage,
                order: {createdAt: "DESC"}
            })
            const commentsDto = comments.map(comment => CommentDTO.makeWithModel(comment))
            return ResultsWrapper.ok(new PaginationDTO<CommentDTO>(commentsDto, page, limitPerPage, Math.ceil(total / limitPerPage), total))
        } catch (error) {
            return ResultsWrapper.fail(new InternalError("Unable to list comments", error as IError))
        }
    }

    async updateIdeaDescription(ideaId: number, description: string): Promise<ResultsWrapper<boolean>> {
        try {
            const ideaFound = await AppDataSource.getRepository(Idea).update({id: ideaId}, {description: description})
            if(ideaFound.affected == 0) return ResultsWrapper.fail(new ErrorRegisterNotFound(ideaId.toString() ,"idea"))
             
            return ResultsWrapper.ok(true);
         } catch (error) {
            return ResultsWrapper.fail(new InternalError("Unable to update idea description", error as IError))
         }
    }

    async updateIdeaTitle(ideaId: number, title: string): Promise<ResultsWrapper<boolean>> {
        try {
            const ideaFound = await AppDataSource.getRepository(Idea).update({id: ideaId}, {title: title})
            if(ideaFound.affected == 0) return ResultsWrapper.fail(new ErrorRegisterNotFound(ideaId.toString() ,"idea"))
             
            return ResultsWrapper.ok(true);
         } catch (error) {
            return ResultsWrapper.fail(new InternalError("Unable to update idea title", error as IError))
         }
    }

    async deleteIdea(ideaId: number): Promise<ResultsWrapper<boolean>> {
        try {
            const ideaRemoved = await AppDataSource.getRepository(Idea).delete({id: ideaId})
            if(ideaRemoved.affected == 0) return ResultsWrapper.fail(new ErrorRegisterNotFound(ideaId.toString() ,"idea"))

            return ResultsWrapper.ok(true);
        } catch (error) {
            return ResultsWrapper.fail(new InternalError("Unable to update idea title", error as IError))
        }
    }

    async findVoteByIdeaAndUser(ideaId: number, userId: number): Promise<ResultsWrapper<Votes>>{
        try {
            const vote = await AppDataSource.getRepository(Votes).findOneBy({idea: {id: ideaId}, user: {id: userId}})
            if(!vote) return ResultsWrapper.fail(new ErrorRegisterNotFound(ideaId.toString() ,"vote"))

            return ResultsWrapper.ok(vote);
        } catch (error) {
            return ResultsWrapper.fail(new InternalError("Unable to update idea title", error as IError))
        }
    }

}