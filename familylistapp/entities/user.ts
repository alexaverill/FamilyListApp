import {Entity,Column,PrimaryGeneratedColumn, ManyToMany} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    birthday:Date;
    @ManyToMany(type=>Event)
    givers:Event[];
    @ManyToMany(type=>Event)
    reciever:Event[];
}