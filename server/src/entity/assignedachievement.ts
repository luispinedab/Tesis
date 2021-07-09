import {Entity,Column,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import {Subject} from './Asignatura';
import { Grade } from './Curso';
import { Achievement } from './Logro';
@Entity("assignedachievement")
export class AssignedAchievement{
    @PrimaryGeneratedColumn()
    IDAssignedAchievement:number; 
    @Column()
    Periodo: string;
    @ManyToOne(type=>Grade,IDGrade=>IDGrade.assignedachievements)
    IDGrade: Grade;
    @ManyToOne(type=>Subject,IDSubject=>IDSubject.assignedachievements)
    IDSubject: Subject;
    @ManyToOne(type=>Achievement,IDLogro=>IDLogro.assignedachievements)
    IDAchievement: Achievement;
    @Column()
    FechaModificacion: Date;
}