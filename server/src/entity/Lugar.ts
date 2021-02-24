import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {Departament} from './Departamento';

@Entity("Lugar", {"schema": "INFO"})
export class Place {
    @PrimaryGeneratedColumn()
    IDPlace:number;
    @Column()
    City:string;
    @ManyToOne(type=>Departament,IDArea=>IDArea.places)
    IDDepartament:Departament;
}