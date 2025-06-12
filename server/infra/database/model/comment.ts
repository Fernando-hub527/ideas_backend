import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Idea } from "./Idea"
import { User } from "./user"

@Entity()
export class Comment{

    constructor(idea: Idea, comment: string, user: User){
        this.idea = idea
        this.comment = comment
        this.user = user
    }

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Idea, {eager: true})
    idea: Idea

    @Column()
    comment: string

    @ManyToOne(() => User, {eager: true})
    user: User

    @CreateDateColumn()
    createdAt!: Date
}