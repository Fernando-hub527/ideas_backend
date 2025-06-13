import { IError } from "../error/IError"

export class ResultsWrapper<T>{
    isSucess: boolean
    error ?: IError
    valueRtr ?: T 
    
    private constructor(isSucess: boolean, error ?:IError, valueRtr ?: T ){
        if(isSucess && error) throw new Error("A result cannot be successful and contain an error mensage")
        if(!isSucess && !error) throw new Error("A result without success should contain a error message")
        this.isSucess = isSucess
        this.error = error
        this.valueRtr = valueRtr
    }

    getValue(): T{
        if(!this.isSucess) throw new Error("Cant retrieve the value from a failed result")
        return this.valueRtr!
    }
    getError(): IError{
        if(this.isSucess) throw new Error("Cant retrieve the value from a successful result")
        return this.error!
    }

    public static ok<T>(value: T): ResultsWrapper<T>{
        return new ResultsWrapper<T>(true, undefined, value)
    }
    public static fail<T>(error: IError): ResultsWrapper<T>{
        return new ResultsWrapper<T>(false, error)
    }
}