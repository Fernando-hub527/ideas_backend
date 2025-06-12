import express from "express"
import { AplicationManager } from "../../server/startApp/appStart"
import request from "supertest"
import { validateProtectedRoutes } from "./defaultTests"
import { generateAccessToken } from "../mock/auth"
import { DataSource } from "typeorm"
import { User } from "../../server/infra/database/model/user"
import { clearDatabase, registerComments, registerIdeas, registerVotes, seedDatabaseWithIdeas } from "../mock/seedDatabase"
import { Idea } from "../../server/infra/database/model/Idea"
import { Votes } from "../../server/infra/database/model/votes"
import { Comment } from "../../server/infra/database/model/comment"

var app: express.Application
var db: DataSource

beforeAll(async () => {
    let application = await new AplicationManager().startTeste()
    app = application.application
    db = application.db
})

describe("Validating creation of ideas", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("post", "/api/ideas/v1/idea", () => app)

    it("if invalid param is sent, 400 is returned", async () => {
        const response = await request(app)
            .post("/api/ideas/v1/idea")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(123456)}`])

        expect(response.statusCode).toEqual(422);
    })

    it("if validIdea is sent, 201 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", "passeord123"))
        const response = await request(app)
            .post("/api/ideas/v1/idea")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({title: "This is a valid title", description: "This is a valid description", category: "Tecnologia"})

        expect(response.statusCode).toEqual(201);
    })

})

describe("Validating creation of votes", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("post", "/api/ideas/v1/idea/vote", () => app)

    it("if invalid param is sent, 400 is returned", async () => {
        const response = await request(app)
            .post("/api/ideas/v1/idea/vote")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(123456)}`])

        expect(response.statusCode).toEqual(422);
    })

    it("if Idea is not found, 404 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .post("/api/ideas/v1/idea/vote")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({ideaId: 1234})

        expect(response.statusCode).toEqual(404);
    })

    it("if users have already voted on the idea, 409 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", "passeord123"))
        const idea = await db.getRepository(Idea).save(new Idea("valid title valid title", "valid description, valid description", "Tecnologia", user))
        await db.getRepository(Votes).save(new Votes(idea, true, user))

        const response = await request(app)
            .post("/api/ideas/v1/idea/vote")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({ideaId: idea.id})

        expect(response.statusCode).toEqual(409);
    })

    it("if valid Idea vote is sent, 201 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", "passeord123"))
        const idea = await db.getRepository(Idea).save(new Idea("valid title valid title", "valid description, valid description", "Tecnologia", user))

        const response = await request(app)
            .post("/api/ideas/v1/idea/vote")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({ideaId: idea.id})

        expect(response.statusCode).toEqual(201);
    })
})

describe("Validating creation of comment", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("post", "/api/ideas/v1/idea/comment", () => app)

    it("if invalid param is sent, 422 is returned", async () => {
        const response = await request(app)
            .post("/api/ideas/v1/idea/comment")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(123456)}`])

        expect(response.statusCode).toEqual(422);
    })


    it("if Idea is not found, 404 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .post("/api/ideas/v1/idea/comment")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({ideaId: 1234, comment: "comment idea comment idea comment idea"})

        expect(response.statusCode).toEqual(404);
    })

    it("if valid Idea comment is sent, 201 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", "passeord123"))
        const idea = await db.getRepository(Idea).save(new Idea("valid title valid title", "valid description, valid description", "Tecnologia", user))

        const response = await request(app)
            .post("/api/ideas/v1/idea/comment")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({ideaId: idea.id, comment: "comment idea comment idea comment idea"})

        expect(response.statusCode).toEqual(201);
    })
})

describe("Validating list highligh ideas", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("get", "/api/ideas/v1/idea/highligh", () => app)
    
    it("If there are 5 ideas, it should return the 3 most voted", async() => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const ideas = await registerIdeas(db, user, 5)
        await registerVotes(db, ideas[4], 10)
        await registerVotes(db, ideas[1], 5)
        await registerVotes(db, ideas[3], 7)


        const response = await request(app)
            .get("/api/ideas/v1/idea/highligh")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
        
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(3)
        expect(response.body[0].id).toEqual(ideas[4].id)
        expect(response.body[1].id).toEqual(ideas[3].id)
        expect(response.body[2].id).toEqual(ideas[1].id)
    })
})

describe("Validating list ideas", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("get", "/api/ideas/v1/idea", () => app)

    it("if invalid param is sent, 422 is returned", async () => {
        const response = await request(app)
            .get("/api/ideas/v1/idea?orderBy=invalid")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(123456)}`])

        expect(response.statusCode).toEqual(422);
    })

    it("if order by most voted is sent, 201 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const ideas = await registerIdeas(db, user, 5)
        await registerVotes(db, ideas[4], 10)
        await registerVotes(db, ideas[1], 5)
        await registerVotes(db, ideas[3], 7)

        const response = await request(app)
            .get("/api/ideas/v1/idea?orderBy=most_voted")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(200);
        expect(response.body.data[0].id).toEqual(ideas[4].id)
        expect(response.body.data[2].id).toEqual(ideas[1].id)
    })

    it("if order by is not sent, 201 is returned and ideas are ordered by most recent", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const ideas = await registerIdeas(db, user, 5)
        await registerVotes(db, ideas[4], 10)
        await registerVotes(db, ideas[1], 5)
        await registerVotes(db, ideas[3], 7)

        const response = await request(app)
            .get("/api/ideas/v1/idea")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(200);
        expect(response.body.data[0].id).toEqual(ideas[4].id)
        expect(response.body.data[1].id).toEqual(ideas[3].id)
    })

    it("if title is sent, 201 and ideas that contain the title will be returned", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const ideas = await registerIdeas(db, user, 5)

        const response = await request(app)
            .get(`/api/ideas/v1/idea?title=${ideas[0].title.slice(0, 7)}`)
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(200);
        expect(response.body.data.length).toEqual(1)
        expect(response.body.data[0].title).toEqual(ideas[0].title)
    })

    it("if there are 10 items and the limit is 2, it should generate 5 pages", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        await registerIdeas(db, user, 10)

        const response = await request(app)
            .get(`/api/ideas/v1/idea?limit=2&page=2`)
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(200);
        expect(response.body.totalPages).toEqual(5)
        expect(response.body.data.length).toEqual(2)
    })

})

describe("Validating idea search by id", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("get", "/api/ideas/v1/idea/:123", () => app)

    it("if invalid param is sent, 400 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const response = await request(app)
            .get("/api/ideas/v1/idea/:123")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(422);
    })

    it("if idea is not found, should return 404", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .get("/api/ideas/v1/idea/1234")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(404);
    })

    it("if idea is found, should return with 200 status", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const ideas = await registerIdeas(db, user, 2)

        const response = await request(app)
            .get(`/api/ideas/v1/idea/${ideas[0].id}`)
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(200);
        expect(response.body.id).toEqual(ideas[0].id)
    })
})

describe("Validate comment listing by idea", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("get", "/api/ideas/v1/idea/comments/:123", () => app)

    it("if invalid param is sent, 422 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .get("/api/ideas/v1/idea/comments")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(422);
    })

    it("if idea is not found, should return 404", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .get("/api/ideas/v1/idea/comments/1234")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(404);
    })

    it("if there are 10 items and the limit is 2, it should generate 5 pages", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const ideas = await registerIdeas(db, user, 2)
        await registerComments(db, ideas[0], 10)

        const response = await request(app)
            .get(`/api/ideas/v1/idea/comments/${ideas[0].id}?limit=2&page=2`)
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(200);
        expect(response.body.totalPages).toEqual(5)
        expect(response.body.data.length).toEqual(2)
    })
})

describe("validate idea description update", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("patch", "/api/ideas/v1/idea/description", () => app)

    it("if invalid param is sent, 400 is returned", async () => {
        const response = await request(app)
            .patch("/api/ideas/v1/idea/description")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(123456)}`])

        expect(response.statusCode).toEqual(422);
    })

     it("if invalid param is sent, 422 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .patch("/api/ideas/v1/idea/description")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(422);
    })

    it("if idea is not found, should return 404", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .patch("/api/ideas/v1/idea/description")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({ideaId: 12375, description: "test test test test test test test test"})

        expect(response.statusCode).toEqual(404);
    })

    it("If the request is valid, the idea should be updated and 204 returned.", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const ideas = await registerIdeas(db, user, 2)

        const response = await request(app)
            .patch("/api/ideas/v1/idea/description")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({ideaId: ideas[0].id, description: "test test test test test test test test"})

        expect(response.statusCode).toEqual(204);
        const updatedIdea = await db.getRepository(Idea).findOneBy({id: ideas[0].id})
        expect(updatedIdea!.description).toEqual("test test test test test test test test")
    })
})

describe("validate idea title update", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("patch", "/api/ideas/v1/idea/title", () => app)

    it("if invalid param is sent, 400 is returned", async () => {
        const response = await request(app)
            .patch("/api/ideas/v1/idea/title")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(123456)}`])

        expect(response.statusCode).toEqual(422);
    })

    it("if invalid param is sent, 422 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .patch("/api/ideas/v1/idea/title")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(422);
    })

    it("if idea is not found, should return 404", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .patch("/api/ideas/v1/idea/title")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({ideaId: 12375, title: "test test test test test test test test"})

        expect(response.statusCode).toEqual(404);
    })

    it("If the request is valid, the idea should be updated and 204 returned.", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const ideas = await registerIdeas(db, user, 2)

        const response = await request(app)
            .patch("/api/ideas/v1/idea/title")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])
            .send({ideaId: ideas[0].id, title: "test test test test test test test test"})

        expect(response.statusCode).toEqual(204);
        const updatedIdea = await db.getRepository(Idea).findOneBy({id: ideas[0].id})
        expect(updatedIdea!.title).toEqual("test test test test test test test test")
    })
})

describe("validate idea delete", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    validateProtectedRoutes("delete", "/api/ideas/v1/idea/123456",() => app)

    it("if invalid param is sent, 400 is returned", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .delete("/api/ideas/v1/idea/0")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(422);
    })

        it("if valid idea is sent, should remove idea", async () => {
        const user = await db.getRepository(User).save(new User("test3@gmail.com", "nome de teste 123 test", "passeord123"))
        const ideas = await registerIdeas(db, user, 2)

        const response = await request(app)
            .delete(`/api/ideas/v1/idea/${ideas[0].id}`)
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(user.id)}`])

        expect(response.statusCode).toEqual(204);
        const ideasFound = await db.getRepository(Idea).find()
        expect(ideasFound.length).toBe(1)
    })
})