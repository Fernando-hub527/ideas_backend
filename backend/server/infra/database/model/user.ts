import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User{
    constructor(email: string, name: string, password: string){
        this.email = email
        this.name = name
        this.password = password
    }

    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true})
    email: string

    @Column()
    name: string

    @Column()
    password: string
}