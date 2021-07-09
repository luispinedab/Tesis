import {Entity,Column,PrimaryColumn,OneToMany} from "typeorm";
import {User} from "./Usuario"
@Entity("usertype")
export class UserType{
    @PrimaryColumn()
    IDUserType:number;
    @Column()
    UserType:string;

    @OneToMany(type => User, user => user.IDUserType) 
    users: User[];
}