import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {Subject} from './Asignatura';
import {SubjectArea} from './SubjectArea';

@Entity("NameSubject", {"schema": "INFO"})
export class NameSubject {
    @PrimaryGeneratedColumn()
    IDNameSubject:number;
    @Column()
    namesubject:string;
    @ManyToOne(type=>SubjectArea,IDArea=>IDArea.namesubjects)
    IDArea:SubjectArea;
    @OneToMany(type => Subject, subject => subject.IDNameSubject) 
    subjects: Subject[];
}