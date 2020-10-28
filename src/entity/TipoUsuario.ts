import {Entity,Column,PrimaryColumn} from "typeorm";
@Entity()
export class TipoUsuario{
    @PrimaryColumn()
    IDTipoUsuario:number;
    @Column()
    TipoUsuario:string;
}