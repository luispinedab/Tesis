import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import { UserType } from './TipoUsuario';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    IDUser:number;
    @Column()
    Name: string;
    @Column()
    Lastname: string;
    @Column()
    Identification: number;
    @ManyToOne(type=>UserType,IDUserType=>IDUserType.UserType)
    IDUserType: UserType;
    @Column()
    Email: string;
    @Column()
    PhoneNumber: string;
    @Column()
    Nickname: string;
    @Column()
    Password: string;
    @Column()
    UserState: number;
}