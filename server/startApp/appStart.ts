import express, { json, Router } from 'express'
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../docs/swagger/documentationGenerator.json"
import { setUserRouts } from '../src/modules/user/interface'
import { setIdeasRouts } from '../src/modules/idea/interface'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { AppDataSource } from '../infra/database/data-source'
if (process.env.NODE_ENV === 'development') dotenv.config({ path: './server/env/dev/.env' })
else if (process.env.NODE_ENV === 'test') dotenv.config({ path: './server/env/test/.env' })

export class AplicationManager {
  app: express.Application

  constructor () {
    this.validEnviroment()
    this.app = express()
  }

  async start (port: number) {
    await AppDataSource.initialize()
    this.setMiddleares()
    this.app.listen(port, () => console.log("Run..."))
    return this.app
  }

  async startTeste () {
    const db = await AppDataSource.setOptions({database: "test"}).initialize()
    this.setMiddleares()
    return {application: this.app, db: db}
  }

  private setMiddleares() {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      next()
    })
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    this.app.use(json())
    this.app.use(cookieParser())
    this.app.use((req, res, next) => {
      if (req.body === undefined) req.body = {}
      next()
    })
    this.app.use("/api/ideas/v1", this.getRoutes())
  }

  private getRoutes(){
      const routs = Router()
      routs.use("/user", setUserRouts())
      routs.use("/idea", setIdeasRouts())
      return routs
  }
  
  private validEnviroment(){
    const environmentVariables = ["JWT_SECRET", "PASSWORD", "DATABASE", "HOST_DATABASE", "DATABASE_PORT", "OTEL_COLLECTOR"]
    environmentVariables.forEach((env) => {
      if (!process.env[env]) throw new Error(`Unable to start application, ${env} not found`)
    })
  }
}