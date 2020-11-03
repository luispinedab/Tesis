import {Entity, Column, PrimaryGeneratedColumn,OneToOne, JoinColumn} from 'typeorm';
import { type } from 'os';
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
    @OneToOne(type=>UserType)@JoinColumn()
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