import { IError } from "./IError";

export class ErrorRegisterAlreadyRegistered implements IError{
    statusCode = 409;
    error: String;
    name: string;
    message: string;
    stack?: string | undefined;

    constructor(idRegistro: String, name: String){
        this.error = `${name} registration with ${idRegistro} already registered`
        this.message = `${name} registration with ${idRegistro} already registered`
        this.name = "Register already registered"
    }

    getError() {
        return this.error
    }
    getStatus() {
        return this.statusCode
    }

}