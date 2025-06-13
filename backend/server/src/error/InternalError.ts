import { logger } from "../../infra/logger";
import { IError } from "./IError";

export class InternalError implements IError{
    error: String;
    statusCode = 500
    name: string;
    message: string;
    stack?: string | undefined;

    constructor(msgError: string, error ?: Error){
        this.error = msgError
        this.message = msgError
        this.name = error ?  error.name: "Internal Error"
        this.stack = error ? error.stack : ""
        logger.error({ 'app.message': `${msgError}, stack: ${this.stack}`});

    }

    getError() {
        return this.error
    }
    getStatus(){
        return this.statusCode
    }


}