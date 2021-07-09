import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Falta} from './Falta';
@Entity("tipofalta", {"schema": "INFO"})
export class TipoFalta {
    @PrimaryGeneratedColumn()
    IDTipoFalta:number;
    @Column()
    TipoFalta: string;
    @OneToMany(type=>Falta, falta => falta.IDTipoFalta)
    faltas:Falta[];
}