import { IUserService } from "../service/IUserService";
import { Request, Response } from "express";
import { validLogin, validNewUser } from "../validators/UserValidator";
export class UserController{
    userService: IUserService

    constructor(userService: IUserService){
        this.userService = userService
    }

    async createUser(req: Request, res: Response){
        const validation = validNewUser({email: req.body.email, name: req.body.name, password: req.body.password})
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError()); return}

        const data = validation.getValue()
        const newUser = await this.userService.createUser(data.name, data.email, data.password)
        if (!newUser.isSucess) {res.status(newUser.getError().getStatus()).send(newUser.getError()); return}
        
        res.status(201).send(newUser.getValue().toResponse())
    }

    async login(req: Request, res: Response){
        const validation = validLogin({email: req.body.email, password: req.body.password})
        if (!validation.isSucess) {res.status(validation.getError().getStatus()).send(validation.getError()); return}

        const data = validation.getValue()
        const userValidation = await this.userService.generateToken(data.email, data.password)
        if (!userValidation.isSucess) {res.status(userValidation.getError().getStatus()).send(userValidation.getError()); return}


        res.cookie('authToken', `Bearer ${userValidation.getValue().token}`, {
            httpOnly: true,
            secure: false, // devido a não estar usando https
            // sameSite: 'lax', 
            maxAge: 3600000,
        });
        res.status(201).send(userValidation.getValue().user.toResponse())
    }
}