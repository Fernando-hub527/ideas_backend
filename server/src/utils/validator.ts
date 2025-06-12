import { Schema } from "joi"
import { ResultsWrapper } from "./ResultsWrapper"
import { ErrorInvalidParams } from "../error/ErrorInvalidParams"

export function validateSchema<T>(schema: Schema, object: unknown){
    const result = schema.validate(object)
    if(result.error) return ResultsWrapper.fail<T>(new ErrorInvalidParams(result.error.message))
    return ResultsWrapper.ok(result.value as T)
}