import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
}