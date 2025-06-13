import { IError } from "./IError";

export class ErrorBadRequest implements IError{
    statusCode = 400;
    error: String;
    name: string;
    message: string;
    stack?: string | undefined;

    constructor(error: string){
        this.error = error
        this.message = error
        this.name = "Bad request"
    }

    getError() {
        return this.error
    }
    getStatus() {
        return this.statusCode
    }

}