import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Votes } from "./votes";
import { Comment } from "./comment";

@Entity()
export class Idea{

    constructor(title: string,  description: string, category: string, author: User){
        this.title = title
        this.description = description
        this.category = category
        this.author = author
    }

    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    createdAt!: Date

    @Column()
    category: string
    
    @ManyToOne(() => User, {eager: true})
    author: User
        
    @OneToMany(() => Votes, (vote) => vote.idea)
    votes!: Votes[]

    @OneToMany(() => Comment, (comment) => comment.idea)
    comments!: Comment[]

    total_votes ?: number
}
