import {Entity,Column,ManyToOne,PrimaryGeneratedColumn,OneToMany} from 'typeorm';
import {Grade} from './Curso';
import {Subject} from './Asignatura';
import { AssignedAchievement } from './assignedachievement';
import { User } from './Usuario';
import { InfoStudent } from './InfoEstudiante';
@Entity("ratings")
export class ratings{
    @PrimaryGeneratedColumn()
    IDratings:number; 
    @Column()
    Periodo: string;
    @ManyToOne(type=>Grade,IDgrade=>IDgrade.Notas)
    IDGrade: Grade;
    @ManyToOne(type=>Subject,IDSubject=>IDSubject.notas)
    IDSubject: Subject;
    @ManyToOne(type=>InfoStudent,IDStudent=>IDStudent.notas)
    IDStudent: InfoStudent;
    @Column("decimal", { precision: 5, scale: 2 })
    Nota: number;
    @ManyToOne(type=>User,IDDocente=>IDDocente.notas)
    IDDocente: User;
    @Column()
    FechadeModificacion: Date;
}