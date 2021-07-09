import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Place} from './Lugar';
@Entity("departament", {"schema": "INFO"})
export class Departament {
    @PrimaryGeneratedColumn()
    IDDepartament:number;
    @Column()
    Departament: string;
    @OneToMany(type=> Place, city => city.IDDepartament)
    places:Place[];
}