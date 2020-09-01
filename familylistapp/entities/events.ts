import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn} from "typeorm";
import { User } from "./user";
import { type } from "os";

@Entity()
export class Event{
    @PrimaryGeneratedColumn("int")
    id:number;
    @Column("text")
    name:string;
    @Column("text")
    image:string;
    @Column("date")
    date:Date;
    @Column("text")
    comments:string;
    @Column("bool")
    active:boolean;
    @ManyToMany(type=>User)
    @JoinColumn()
    givers:User[];
    @ManyToMany(type=>User)
    @JoinColumn()
    recievers:User[];
}