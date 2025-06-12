import { ResultsWrapper } from "../../../utils/ResultsWrapper";
import { UserDTO } from "../dto/UserDTO";

export interface IUserService{
    findUserById(userId: number): Promise<ResultsWrapper<UserDTO>>
    createUser(name: string, email: string, password: string): Promise<ResultsWrapper<UserDTO>>
    generateToken(email: string, password: string): Promise<ResultsWrapper<string>>
}