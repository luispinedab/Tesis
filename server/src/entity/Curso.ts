import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { User } from './Usuario';
import {LevelGrade} from './NivelCurso';
import {Subject} from './Asignatura';

@Entity()
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
}