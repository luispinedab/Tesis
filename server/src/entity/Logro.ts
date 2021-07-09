import {Entity,Column,ManyToOne,PrimaryGeneratedColumn,OneToMany} from 'typeorm';
import {LevelGrade} from './NivelCurso';
import {Subject} from './Asignatura';
import { AssignedAchievement } from './assignedachievement';
@Entity("achievement")
export class Achievement{
    @PrimaryGeneratedColumn()
    IDAchievement:number; 
    @Column()
    Achievement: string;
    @ManyToOne(type=>LevelGrade,IDLevelGrade=>IDLevelGrade.achievements)
    IDLevelGrade: LevelGrade;
    @ManyToOne(type=>Subject,IDSubject=>IDSubject.achievements)
    IDSubject: Subject;
    @OneToMany(type => AssignedAchievement, assignedachievement => assignedachievement.IDAchievement) 
    assignedachievements: AssignedAchievement[];
}