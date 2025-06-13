import { DataSource } from "typeorm";
import { User } from "./model/user";
import { Idea } from "./model/Idea";
import { Comment } from "./model/comment";
import { Votes } from "./model/votes";
import dotenv from 'dotenv'
if (process.env.NODE_ENV === 'development') dotenv.config({ path: './server/env/dev/.env' })
else if (process.env.NODE_ENV === 'test') dotenv.config({ path: './server/env/test/.env' })

export const AppDataSource = new DataSource({
    type: "postgres",
    host:  process.env.HOST_DATABASE,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.USERNAME_DATABASE,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Idea, Comment, Votes],
    migrations: [],
    subscribers: [],
})