import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity("aspirantes")
export class Aspirantes {
    @PrimaryGeneratedColumn()
    IDAspirantes:number;
    @Column()
    Nombres:string;
    @Column()
    Documento:Number;
    @Column()
    Correo:string;
    @Column()
    Nickname:string;
    @Column()
    Password:string;
    @Column()
    FechaCreacion:Date;
    @Column()
    FechaModificacion:Date;
    @Column()
    UserState: number;
}