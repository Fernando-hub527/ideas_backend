import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Idea } from "./Idea";
import { User } from "./user";

@Entity()
export class Votes{

    constructor(idea: Idea, liked: boolean, user: User){
        this.idea = idea
        this.liked = liked
        this.user = user
    }

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Idea)
    idea: Idea

    @Column()
    liked: boolean

    @ManyToOne(() => User)
    user: User

    @CreateDateColumn({name: "created_at"})
    createdAt!: Date
}