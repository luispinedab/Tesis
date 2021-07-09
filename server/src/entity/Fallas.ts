import {Entity,Column,ManyToOne,PrimaryGeneratedColumn,OneToMany} from 'typeorm';
import {Grade} from './Curso';
import { User } from './Usuario';
import { InfoStudent } from './InfoEstudiante';
@Entity("absences")
export class absences{
    @PrimaryGeneratedColumn()
    IDabsences:number; 
    @Column()
    Periodo: string;
    @ManyToOne(type=>Grade,IDgrade=>IDgrade.Fallas)
    IDGrade: Grade;
    @ManyToOne(type=>InfoStudent,IDStudent=>IDStudent.fallas)
    IDStudent: InfoStudent;
    @Column()
    FechaReporte: Date;
    @ManyToOne(type=>User,IDDocente=>IDDocente.fallas)
    IDDocente: User;
    @Column()
    FechadeModificacion: Date;
}