import Joi, { func } from "joi";
import { validateSchema } from "../../../utils/validator";

export function validNewIdea(idea: unknown){
    const schema = Joi.object({
        title: Joi.string().max(150).min(10).required(),
        description: Joi.string().max(500).min(10).required(),
        category: Joi.string().max(100).min(3).required(),
        userId: Joi.number().required()
    })
    return validateSchema<{title: string, description: string, category: string, userId: number}>(schema, idea)
}

export function validNewComment(comment: unknown){
    const schema = Joi.object({
        comment: Joi.string().max(500).min(0).required(),
        ideaId: Joi.number().max(100000).min(1).required(),
        userId: Joi.number().required()
    })
    return validateSchema<{comment: string, ideaId: number, userId: number}>(schema, comment)
}

export function validIdeaFilters(idea: unknown){
    const schema =  Joi.object({
        orderBy: Joi.string().valid("most_voted", "latest").optional().default("latest"),
        title: Joi.string().max(150).optional(),
        page: Joi.number().max(1000).optional().default(1),
        limitPerPage: Joi.number().max(1000).optional().default(30)
    })
    
    return validateSchema<{orderBy: "most_voted" | "latest", title: string, page: number, limitPerPage: number}>(schema, idea)
}

export function validCommentFilters(idea: unknown){
    const schema =  Joi.object({
        ideaId: Joi.number().max(100000).min(1).required(),
        page: Joi.number().max(1000).optional().default(1),
        limitPerPage: Joi.number().max(1000).optional().default(30)
    })
    
    return validateSchema<{page: number, limitPerPage: number, ideaId: number}>(schema, idea)
}

export function validIdeaDescription(idea: unknown){
    const schema =  Joi.object({
        ideaId: Joi.number().max(100000).min(1).required(),
        description: Joi.string().max(500).min(10).required(),
    })
    
    return validateSchema<{description: string, ideaId: number}>(schema, idea)
}

export function validIdeaTitle(idea: unknown){
    const schema =  Joi.object({
        ideaId: Joi.number().max(100000).min(1).required(),
        title: Joi.string().max(500).min(10).required(),
    })
    
    return validateSchema<{title: string, ideaId: number}>(schema, idea)
}

export function validIdeaId(idea: unknown){
    const schema =  Joi.object({
        ideaId: Joi.number().max(100000).min(1).required(),
        userId: Joi.number().required()
    })
    
    return validateSchema<{userId: number, ideaId: number}>(schema, idea)
}

