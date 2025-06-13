import { User } from "../../../../infra/database/model/user"

export class UserDTO{
    readonly userId: number
    readonly name: string
    readonly email: string
    readonly password: string

    constructor(name: string, email: string, userId: number, password: string){
        this.userId = userId
        this.name = name
        this.email = email
        this.password = password
    }

    static makeWithModel(user: User){
        return new UserDTO(user.name, user.email, user.id, user.password)
    }
    
    toResponse(){
        return {name: this.name, email: this.email, userId: this.userId}
    }
}