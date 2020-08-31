import {Entity,Column,PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { User } from "./user";
import { type } from "os";

@Entity()
export class Event{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    image:string;
    @Column()
    date:Date;
    @Column()
    comments:string;
    @Column()
    active:boolean;
    @ManyToMany(type=>User)
    @JoinTable
    givers:User[];
    @ManyToMany(type=>User)
    @JoinTable
    recievers:User[];
}