import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { UserType } from './TipoUsuario';
import {Grade} from './Curso';

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
    @ManyToOne(type=>UserType,IDUserType=>IDUserType.users)
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

    @OneToMany(type => Grade, grade => grade.IDDirector) 
    grades: Grade[];
}