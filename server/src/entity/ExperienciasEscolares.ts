import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {InfoStudent} from './InfoEstudiante';
@Entity("experienciasescolares")
export class ExperienciasEscolares {
    @PrimaryGeneratedColumn()
    IDExperienciasEscolares:number;
    @Column()
    NombredelColegio:string;
    @Column()
    DirecciondelColegio:string;
    @Column()
    TelefonodelColegio:string;
    @Column()
    AñosCursados:string;
    @ManyToOne(type=>InfoStudent,IDInfoEstudiante=>IDInfoEstudiante.experienciasescolares)
    IDInfoEstudiante:InfoStudent;
}