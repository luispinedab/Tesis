import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { Grade } from './Curso';
import { Question } from './Pregutas';

@Entity("answer", {"schema": "INFO"})
export class Answer {
    @PrimaryGeneratedColumn()
    IDRespuesta:number;
    @Column()
    Respuesta:string;
    @Column()
    Status:Boolean;
    @ManyToOne(type=>Question,IDpregunta=>IDpregunta.Respuestas)
    IDPregunta: Question;
}