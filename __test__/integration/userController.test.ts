import express from "express"
import request from "supertest"
import { AplicationManager } from "../../server/startApp/appStart"
import { DataSource } from "typeorm"
import { clearDatabase } from "../mock/seedDatabase"
import { validateProtectedRoutes } from "./defaultTests"
import { generateAccessToken, generatePassword } from "../mock/auth"
import { User } from "../../server/infra/database/model/user"

var app: express.Application
var db: DataSource

beforeAll(async () => {
    let application = await new AplicationManager().startTeste("test_user")
    app = application.application
    db = application.db
})

describe("validating user creation", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })
    
    validateProtectedRoutes("post", "/api/ideas/v1/user", () => app)
  
    it("if invalid user is sent, it should return 422", async () => {
        const response = await request(app)
            .post("/api/ideas/v1/user")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(123456)}`])
            .send({email: "invalidemail", name: "Fernando COelho Saraiva", password: "senha123test123"})

        expect(response.statusCode).toEqual(422);
    })

    it("if if email is already in use, it should return 409", async () => {
        const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", "passeord123"))

        const response = await request(app)
            .post("/api/ideas/v1/user")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(123456)}`])
            .send({email: user.email, name: "Fernando COelho Saraiva", password: "senha123test123"})

        expect(response.statusCode).toEqual(409);
    })

    it("if user is created, password is encrypted", async () => {
        const response = await request(app)
            .post("/api/ideas/v1/user")
            .set("Cookie", [`authToken=Bearer ${generateAccessToken(123456)}`])
            .send({email: "ferandnpo@gmail.com", name: "Fernando COelho Saraiva", password: "senha senha senha"})

        expect(response.statusCode).toEqual(201);
        const userFound = await db.getRepository(User).findOneBy({email: "ferandnpo@gmail.com"})
        expect(userFound!.password).not.toBe("senha senha senha")
    })
})

describe("validating login", () => {
    beforeEach(async () => {
        await clearDatabase(db)
    })

    it("if credentials with invalid format are sent, it should return 422", async () => {
        const response = await request(app)
            .post("/api/ideas/v1/user/login")

        expect(response.statusCode).toEqual(422);
    })

    it("if user is not found, it should return 401", async () => {
        const response = await request(app)
            .post("/api/ideas/v1/user/login")
            .send({email: "fernando@gmail.com", password: "senha123senha123"})

        expect(response.statusCode).toEqual(401);
    })

    it("if invalid password is sent, it should return 401", async () => {
        const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", await generatePassword("passeord123")))

        const response = await request(app)
            .post("/api/ideas/v1/user/login")
            .send({email: user.email, password: "senha123senha123"})

        expect(response.statusCode).toEqual(401);
    })

    it("if valid password is sent, it should return 204 with cookie", async () => {
        const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", await generatePassword("passeord123")))

        const response = await request(app)
            .post("/api/ideas/v1/user/login")
            .send({email: user.email, password: "passeord123"})

        expect(response.statusCode).toEqual(204);
        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.headers['set-cookie'][0]).toMatch(/authToken=.*HttpOnly/);
    })
})