import {Entity,Column,PrimaryGeneratedColumn, ManyToMany} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn("int")
    id:number;
    @Column("text")
    name:string;
    @Column("text")
    email:string;
    @Column("text")
    password:string;
    @Column("date")
    birthday:Date;
    @ManyToMany(type=>Event)
    givers:Event[];
    @ManyToMany(type=>Event)
    reciever:Event[];
}