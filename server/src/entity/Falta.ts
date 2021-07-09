import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {TipoFalta} from './TipoFalta';
import {Remark} from './Observaciones';

@Entity("falta", {"schema": "INFO"})
export class Falta {
    @PrimaryGeneratedColumn()
    IDFalta:number;
    @Column()
    Falta:string;
    @ManyToOne(type=>TipoFalta,IDTipoFalta=>IDTipoFalta.faltas)
    IDTipoFalta:TipoFalta;
    @OneToMany(type => Remark, remark => remark.IDFalta) 
    remarks: Remark[];
}