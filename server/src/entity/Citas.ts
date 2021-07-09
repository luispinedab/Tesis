import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {InfoStudent} from './InfoEstudiante';
@Entity("citas")
export class Citas {
    @PrimaryGeneratedColumn()
    IDCitas:number;
    @Column()
    Fecha:Date;
    @ManyToOne(type=>InfoStudent,IDInfoEstudiante=>IDInfoEstudiante.citas)
    IDInfoEstudiante:InfoStudent;
}