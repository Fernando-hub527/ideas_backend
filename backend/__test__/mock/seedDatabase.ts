import { DataSource } from "typeorm";
import { User } from "../../server/infra/database/model/user";
import { Idea } from "../../server/infra/database/model/Idea";
import { Comment } from "../../server/infra/database/model/comment";
import { Votes } from "../../server/infra/database/model/votes";

export async function clearDatabase(db: DataSource){
    await db.getRepository(Votes).deleteAll()
    await db.getRepository(Comment).deleteAll()
    await db.getRepository(Idea).deleteAll()
    await db.getRepository(User).deleteAll()
}

export async function seedDatabaseWithIdeas(db: DataSource){
    const user = await db.getRepository(User).save(new User("test@gmail.com", "nome de teste 123 test", "passeord123"))
    const user2 = await db.getRepository(User).save(new User("test2@gmail.com", "nome de teste 123 test", "passeord123"))
    const idea1 = await db.getRepository(Idea).save(new Idea("valid title valid title", "valid description, valid description", "Tecnologia", user))
    const idea2 = await db.getRepository(Idea).save(new Idea("valid title valid title", "valid description, valid description", "Tecnologia", user))
    const idea3 = await db.getRepository(Idea).save(new Idea("valid title valid title", "valid description, valid description", "Tecnologia", user))
    await db.getRepository(Idea).save(new Idea("valid title valid title", "valid description, valid description", "Tecnologia", user))
    await db.getRepository(Idea).save(new Idea("valid title valid title", "valid description, valid description", "Tecnologia", user))

    await db.getRepository(Votes).save(new Votes(idea1, true, user))
    await db.getRepository(Votes).save(new Votes(idea1, true, user2))
    await db.getRepository(Votes).save(new Votes(idea2, true, user))
    await db.getRepository(Votes).save(new Votes(idea2, true, user2))
    await db.getRepository(Votes).save(new Votes(idea3, true, user2))
    await db.getRepository(Comment).save(new Comment(idea1, "comment comment comment", user2))
}

export async function registerIdeas(db: DataSource, user: User, amount: number){
    let ideas: Array<Idea> = []
    for(let i = 0; i< amount; i++) {
        ideas.push(
            await db.getRepository(Idea).save(new Idea(`test${i} title, test title`, "test description test descrioprion", "TECNOLOGIA", user))
        )
    }
    return ideas
}

export async function registerVotes(db: DataSource, idea: Idea, amount: number){
    let users: Array<User> = []
    let votes: Array<Votes> = []
    const prefix = Math.random()

    for(let i = 0; i< amount; i++) users.push(new User(`${prefix.toFixed(2)}emailT${i}@gmail.com`, "name test name test", "defaultPass"))
    users = await db.getRepository(User).save(users)
    users.forEach(user => votes.push(new Votes(idea, true, user)))

    await db.getRepository(Votes).save(votes)
}

export async function registerComments(db: DataSource, idea: Idea, amount: number){
    let users: Array<User> = []
    let comments: Array<Comment> = []
    const prefix = Math.random()

    for(let i = 0; i< amount; i++) users.push(new User(`${prefix.toFixed(2)}emailT${i}@gmail.com`, "name test name test", "defaultPass"))
    users = await db.getRepository(User).save(users)
    users.forEach(user => comments.push(new Comment(idea, "comment comment comment comment comment", user)))

    await db.getRepository(Comment).save(comments)
}