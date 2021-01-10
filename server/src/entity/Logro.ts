import {Entity,Column,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import {LevelGrade} from './NivelCurso';
import {Subject} from './Asignatura';
@Entity()
export class Achievement{
    @PrimaryGeneratedColumn()
    IDAchievement:number; 
    @Column()
    Achievement: string;
    @ManyToOne(type=>LevelGrade,IDLevelGrade=>IDLevelGrade.achievements)
    IDLevelGrade: LevelGrade;
    @ManyToOne(type=>Subject,IDSubject=>IDSubject.achievements)
    IDSubject: Subject;
}