import {Entity,Column,PrimaryGeneratedColumn, OneToOne, OneToMany} from "typeorm";
import { User } from "./user";
import { ListItem } from "./list_item";

@Entity()
export class List{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    active:boolean;
    @OneToMany(type=>ListItem)
    items:ListItem[]
}