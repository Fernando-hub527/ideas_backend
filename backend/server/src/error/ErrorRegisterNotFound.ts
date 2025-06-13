import { IError } from "./IError";

export class ErrorRegisterNotFound implements IError{
    error: String;
    statusCode = 404
    name: string;
    message: string;
    stack?: string | undefined;
    
    constructor(idRegistro: String, name: String){
        this.error = `Could not find ${name} record with id ${idRegistro}`
        this.message = `Could not find ${name} record with id ${idRegistro}`
        this.name = "Register Not Found"
    }

    getError() {
        return this.error
    }
    getStatus(){
        return this.statusCode
    }


}