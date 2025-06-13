import { IError } from "./IError";

export class ErrorAccessDenied implements IError{
    statusCode = 403;
    error: String;
    name: string;
    message: string;
    stack?: string | undefined;

    constructor(){
        this.error = `Unable to access resource, permission denied`
        this.name = "permission denied"
        this.message = "Unable to access resource, permission denied"
    }

    getError() {
        return this.error
    }
    getStatus() {
        return this.statusCode
    }

}