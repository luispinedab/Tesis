import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { User } from './Usuario';
import {LevelGrade} from './NivelCurso';
import {Subject} from './Asignatura';
import { AssignedAchievement } from './assignedachievement';
import { InfoStudent } from './InfoEstudiante';
import {ratings} from './Notas';
import { absences } from './Fallas';
import { Question } from './Pregutas';

@Entity("grade")
export class Grade {
    @PrimaryGeneratedColumn()
    IDGrade:number;
    @Column()
    Year: number;
    @ManyToOne(type=>LevelGrade,IDLevelGrade=>IDLevelGrade.grades)
    IDLevelGrade: LevelGrade;
    @Column()
    NameGrade: string;
    @ManyToOne(type=>User,IDDirector=>IDDirector.grades)
    IDDirector: User;
    @OneToMany(type => Subject, subject => subject.IDGrade) 
    subjects: Subject[];
    @OneToMany(type => AssignedAchievement, assignedachievement => assignedachievement.IDGrade) 
    assignedachievements: AssignedAchievement[];
    @OneToMany(type=> InfoStudent, info => info.IDGrade)
    InfoStudents:InfoStudent[];
    @OneToMany(type=> ratings, rating => rating.IDGrade)
    Notas:ratings[];
    @OneToMany(type=> absences, absence => absence.IDGrade)
    Fallas:absences[];
}