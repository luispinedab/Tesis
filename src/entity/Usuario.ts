import {Entity, Column, PrimaryGeneratedColumn,OneToOne, JoinColumn} from 'typeorm';
import { type } from 'os';
import { TipoUsuario } from './TipoUsuario';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    IDUsuario:number;
    @Column()
    Nombres: string;
    @Column()
    Apellidos: string;
    @Column()
    Identificación: number;
    @OneToOne(type=>TipoUsuario)@JoinColumn()
    idTipoUsuario: TipoUsuario;
    @Column()
    Mail: string;
    @Column()
    Celular: string;
    @Column()
    Usuario: string;
    @Column()
    Contraseña: string;
    @Column()
    Estado: number;


}