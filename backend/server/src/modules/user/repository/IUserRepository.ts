import { ResultsWrapper } from "../../../utils/ResultsWrapper";
import { UserDTO } from "../dto/UserDTO";

export interface IUserRepository{
    findUserById(userId: number): Promise<ResultsWrapper<UserDTO>> 
    findUserByEmail(email: string): Promise<ResultsWrapper<UserDTO>> 
    createUser(name: string, email: string, password: string): Promise<ResultsWrapper<UserDTO>> 
}