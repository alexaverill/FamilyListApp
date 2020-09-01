import {Entity,Column,PrimaryGeneratedColumn, OneToOne, OneToMany} from "typeorm";
import { User } from "./user";
import { ListItem } from "./list_item";

@Entity()
export class List{
    @PrimaryGeneratedColumn("int")
    id:number;
    @Column("text")
    name:string;
    @Column("bool")
    active:boolean;
    @OneToMany(type=>ListItem)
    items:ListItem[]
}