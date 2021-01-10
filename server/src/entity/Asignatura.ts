import {Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne} from 'typeorm';
import {NameSubject} from './NombreAsignatura';
import { User } from './Usuario';
import { Grade} from './Curso';
import {Achievement} from './Logro';
@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    IDSubject:number;
    @Column()
    Year: number;
    @ManyToOne(type=>User,IDTeacher=>IDTeacher.subjects)
    IDTeacher: User;
    @ManyToOne(type=>Grade,IDGrade=>IDGrade.subjects)
    IDGrade: Grade;
    @ManyToOne(type=>NameSubject,IDNameSubject=>IDNameSubject.subjects)
    IDNameSubject: NameSubject; 
    @OneToMany(type => Achievement, achievement => achievement.IDSubject) 
    achievements: Achievement[];
}