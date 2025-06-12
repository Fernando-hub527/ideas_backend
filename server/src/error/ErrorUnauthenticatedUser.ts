import { IError } from "./IError";

export class ErrorUnauthenticatedUser implements IError{
    statusCode = 401;
    error: String;
    name: string;
    message: string;
    stack?: string | undefined;
    
    constructor(reason: string){
        this.error = reason
        this.message = reason
        this.name = `Unauthenticated User`   
    }

    getError() {
        return this.error
    }
    getStatus() {
        return this.statusCode
    }

}