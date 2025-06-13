import jwt from "jsonwebtoken"
import { IUserService } from "./IUserService"
import { ResultsWrapper } from "../../../utils/ResultsWrapper"
import { UserDTO } from "../dto/UserDTO"
import { IUserRepository } from "../repository/IUserRepository"
import { ErrorRegisterAlreadyRegistered } from "../../../error/ErrorRegisterAlreadyRegistered"
import argon2 from "argon2";
import { ErrorUnauthenticatedUser } from "../../../error/ErrorUnauthenticatedUser"
import { ErrorAccessDenied } from "../../../error/ErrorAccessDenied"

export class UserService implements IUserService{
    repository: IUserRepository

    constructor(repository: IUserRepository){
        this.repository = repository
    }

    findUserById(userId: number): Promise<ResultsWrapper<UserDTO>> {
        return this.repository.findUserById(userId)
    }
    
    async createUser(name: string, email: string, password: string): Promise<ResultsWrapper<UserDTO>> {
        const user = await this.repository.findUserByEmail(email)
        if(user.isSucess) return ResultsWrapper.fail(new ErrorRegisterAlreadyRegistered(email, "user"))

        const passwordHash = await argon2.hash(password, {type: argon2.argon2id})
        return this.repository.createUser(name, email, passwordHash)
    }

    async generateToken(email: string, password: string): Promise<ResultsWrapper<{token: string, user: UserDTO}>> {
        const user = await this.repository.findUserByEmail(email)
        if(!user.isSucess) return ResultsWrapper.fail(new ErrorUnauthenticatedUser("Invalid username or password"))

        const validPass = await argon2.verify(user.getValue().password, password)
        if (!validPass) return ResultsWrapper.fail(new ErrorUnauthenticatedUser("Invalid username or password"))

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 604800, data: {userId: user.getValue().userId}
        }, process.env.JWT_SECRET!.toString())
        return ResultsWrapper.ok({token: token, user: user.getValue()})
    }
}