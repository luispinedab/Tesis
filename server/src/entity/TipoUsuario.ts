import {Entity,Column,PrimaryColumn} from "typeorm";
@Entity()
export class UserType{
    @PrimaryColumn()
    IDUserType:number;
    @Column()
    UserType:string;
}