import { IError } from "./IError";

export class ErrorInvalidCredentials implements IError{
    statusCode = 403;
    error: String;
    name: string;
    message: string;
    stack?: string | undefined;

    constructor(){
        this.error = `Invalid user credentials`
        this.message = `Unable to validate access`
        this.name = `Invalid user credentials`
    }

    getError() {
        return this.error
    }
    getStatus() {
        return this.statusCode
    }

}