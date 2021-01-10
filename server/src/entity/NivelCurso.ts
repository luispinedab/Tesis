import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Grade} from './Curso';
import {Achievement} from './Logro';
@Entity("LevelGrade", {"schema": "INFO"})
export class LevelGrade {
    @PrimaryGeneratedColumn()
    IDLevelGrade:number;
    @Column()
    levelgrade:string;
    @OneToMany(type => Grade, grade => grade.IDLevelGrade) 
    grades: Grade[];
    @OneToMany(type => Achievement, achievement => achievement.IDLevelGrade) 
    achievements: Achievement[];
}