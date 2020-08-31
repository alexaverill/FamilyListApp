import {Entity,Column,PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { User } from "./user";

@Entity()
export class ListItem{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    url:string;
    @Column()
    isClaimed:boolean;
    @OneToOne(type=>User)
    @JoinColumn()
    claimedBy:User;
    @Column()
    quantity:number;
    @Column()
    comments:string
}