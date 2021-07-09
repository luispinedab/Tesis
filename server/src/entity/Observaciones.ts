import {Entity,Column,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import {Subject} from './Asignatura';
import {InfoStudent} from './InfoEstudiante';
import {Falta} from './Falta';
@Entity("remark")
export class Remark{
    @PrimaryGeneratedColumn()
    IDremark:number; 
    @Column()
    Periodo: string;
    @Column()
    IDLevelGrade: string;
    @ManyToOne(type=>InfoStudent,IDInfoEstudiante=>IDInfoEstudiante.remarks)
    IDInfoEstudiante: InfoStudent;
    @Column()
    Aspecto: string;
    @ManyToOne(type=>Subject,IDSubject=>IDSubject.remarks)
    IDSubject: Subject;
    @ManyToOne(type=>Falta,IDSubject=>IDSubject.remarks)
    IDFalta: Falta;
    @Column()
    Situacion_Presentada: string;
    @Column()
    Posicion_Estudiante: string;
    @Column()
    Acuerdos_Mejoramiento: string;
    @Column()
    Docente: string;
    @Column()
    FechaCreacion: Date; 
    @Column()
    FechaModificacion: Date;
}