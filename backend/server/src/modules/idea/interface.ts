import { Router } from "express";
import { IdeaController } from "./controller/Idea";
import { symmetricAuthenticationMiddleware } from "../../security/authenticationMiddleware";
import { IdeaService } from "./service/IdeaService";
import { IdeaRepository } from "./repository/IdeaRepository";

export function setIdeasRouts(): Router{
    const routes = Router()
    const service = new IdeaService(new IdeaRepository())
    const controller = new IdeaController(service)

    routes.post("/", symmetricAuthenticationMiddleware, controller.createIdea.bind(controller))
    routes.post("/vote", symmetricAuthenticationMiddleware, controller.createVote.bind(controller))
    routes.post("/comment", symmetricAuthenticationMiddleware, controller.createIdeaComment.bind(controller))

    routes.get("/highligh", symmetricAuthenticationMiddleware, controller.listHighlightIdeas.bind(controller))
    routes.get("/", symmetricAuthenticationMiddleware, controller.listIdeas.bind(controller))
    routes.get("/:ideaId", symmetricAuthenticationMiddleware, controller.findIdeaById.bind(controller))
    routes.get("/comments/:ideaId", symmetricAuthenticationMiddleware, controller.listCommentsById.bind(controller))

    routes.patch("/description", symmetricAuthenticationMiddleware, controller.updateIdeaDescription.bind(controller))
    routes.patch("/title", symmetricAuthenticationMiddleware, controller.updateIdeaTitle.bind(controller))

    routes.delete("/:ideaId", symmetricAuthenticationMiddleware, controller.deleteIdea.bind(controller))

    return routes
}