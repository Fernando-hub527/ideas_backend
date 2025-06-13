export interface IError extends Error{
    statusCode: number
    error: String
    
    getError(): String
    getStatus(): number
}