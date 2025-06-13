import { IError } from "./IError";

export class ErrorInvalidParams implements IError{
    statusCode = 422;
    error: String;
    name: string;
    message: string;
    stack?: string | undefined;

    constructor(rasonError: String){
        this.error = `${rasonError}`
        this.message = `${rasonError}`
        this.name = "Invalid Parameters"
    }

    getError() {
        return this.error
    }
    getStatus() {
        return this.statusCode
    }

}