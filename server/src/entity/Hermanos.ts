import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {InfoStudent} from './InfoEstudiante';
@Entity("Hermanos")
export class Hermanos {
    @PrimaryGeneratedColumn()
    IDHermanos:number;
    @Column()
    NombreHermano:string;
    @Column()
    EdadHermano:string;
    @Column()
    CursoHermano:string;
    @ManyToOne(type=>InfoStudent,IDInfoEstudiante=>IDInfoEstudiante.hermanos)
    IDInfoEstudiante:InfoStudent;
}