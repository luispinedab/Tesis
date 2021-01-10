import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {NameSubject} from './NombreAsignatura';
@Entity("SubjectArea", {"schema": "INFO"})
export class SubjectArea {
    @PrimaryGeneratedColumn()
    IDArea:number;
    @Column()
    Area: string;
    @OneToMany(type=> NameSubject, namesubject => namesubject.IDArea)
    namesubjects:NameSubject[];
    //@ManyToOne(type=>NameSubject,IDNameSubject=>IDNameSubject.subjectareas)
    //IDNameSubject: NameSubject;
}