import {Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne} from 'typeorm';
import {NameSubject} from './NombreAsignatura';
import { User } from './Usuario';
import { Grade} from './Curso';
import {Achievement} from './Logro';
import {Remark} from './Observaciones';
import { AssignedAchievement } from './assignedachievement';
import { ratings } from './Notas';
@Entity("subject")
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
    @OneToMany(type => Remark, remark => remark.IDSubject) 
    remarks: Remark[];
    @OneToMany(type => AssignedAchievement, assignedachievement => assignedachievement.IDSubject) 
    assignedachievements: AssignedAchievement[];
    @OneToMany(type => ratings, rating => rating.IDSubject) 
    notas: ratings[];
}