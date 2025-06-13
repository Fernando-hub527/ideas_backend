import { Router } from "express"
import { UserRepository } from "./repository/UserRepository"
import { UserService } from "./service/UserService"
import { UserController } from "./controller/User"
import { symmetricAuthenticationMiddleware } from "../../security/authenticationMiddleware"

export function setUserRouts(): Router{
    const userService = new UserService(new UserRepository())
    const userController = new UserController(userService)

    const routes = Router()
    routes.post("/login", userController.login.bind(userController))
    routes.post("/", symmetricAuthenticationMiddleware, userController.createUser.bind(userController))

    return routes

}

