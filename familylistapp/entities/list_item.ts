import {Entity,Column,PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { User } from "./user";

@Entity()
export class ListItem{
    @PrimaryGeneratedColumn("int")
    id:number;
    @Column("text")
    name:string;
    @Column("text")
    url:string;
    @Column("bool")
    isClaimed:boolean;
    @OneToOne(type=>User)
    @JoinColumn()
    claimedBy:User;
    @Column("int")
    quantity:number;
    @Column("text")
    comments:string
}