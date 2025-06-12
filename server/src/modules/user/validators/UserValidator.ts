import Joi from "joi";
import { validateSchema } from "../../../utils/validator";

export function validNewUser(user: unknown){
    const schema = Joi.object({
        name: Joi.string().max(100).min(5).required(),
        email: Joi.string().max(150).min(5).required(),
        password: Joi.string().max(100).min(5).required()
    })

    return validateSchema<{name: string, email: string, password: string}>(schema, user)
}

export function validLogin(user: unknown){
    const schema = Joi.object({
        email: Joi.string().max(150).min(5).required(),
        password: Joi.string().max(100).min(5).required()
    })

    return validateSchema<{email: string, password: string}>(schema, user)
}