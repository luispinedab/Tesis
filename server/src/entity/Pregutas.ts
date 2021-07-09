import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { Grade } from './Curso';
import { LevelGrade } from './NivelCurso';
import { Answer } from './Respuestas';

@Entity("question", {"schema": "INFO"})
export class Question {
    @PrimaryGeneratedColumn()
    IDPregunta:number;
    @Column()
    Pregunta:string;
    @ManyToOne(type=>LevelGrade,IDLevelGrade=>IDLevelGrade.Preguntas)
    IDLevelGrade: LevelGrade;
    @OneToMany(type=> Answer, answer => answer.IDPregunta)
    Respuestas:Answer[];
}