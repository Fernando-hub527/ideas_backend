import { AppDataSource } from "../../../../infra/database/data-source";
import { User } from "../../../../infra/database/model/user";
import { ErrorRegisterNotFound } from "../../../error/ErrorRegisterNotFound";
import { IError } from "../../../error/IError";
import { InternalError } from "../../../error/InternalError";
import { ResultsWrapper } from "../../../utils/ResultsWrapper";
import { UserDTO } from "../dto/UserDTO";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository{
    
    async findUserById(userId: number): Promise<ResultsWrapper<UserDTO>> {
        try {
            const user = AppDataSource.getRepository(User)
            const userFound = await user.findOneBy({id: userId})
            if(!userFound) return ResultsWrapper.fail<UserDTO>(new ErrorRegisterNotFound(userId.toString() ,"user"))
            
            return ResultsWrapper.ok(UserDTO.makeWithModel(userFound));
        } catch (error) {
            return ResultsWrapper.fail<UserDTO>(new InternalError("Unable to complete user search by id", error as IError))
        }
    }
    async findUserByEmail(email: string): Promise<ResultsWrapper<UserDTO>> {
        try {
            const user = AppDataSource.getRepository(User)
            const userFound = await user.findOneBy({email: email})
            if(!userFound) return ResultsWrapper.fail<UserDTO>(new ErrorRegisterNotFound(email ,"user"))
            
            return ResultsWrapper.ok(UserDTO.makeWithModel(userFound));
        } catch (error) {
            return ResultsWrapper.fail<UserDTO>(new InternalError("Unable to complete user search by email", error as IError))
        }
    }
    async createUser(name: string, email: string, password: string): Promise<ResultsWrapper<UserDTO>> {
        try {
            const createdUser = await AppDataSource.getRepository(User).save(new User(email, name, password))
            return ResultsWrapper.ok(UserDTO.makeWithModel(createdUser));
        } catch (error) {
            return ResultsWrapper.fail<UserDTO>(new InternalError("Unable to complete user creation", error as IError))
        }
    }
    
}