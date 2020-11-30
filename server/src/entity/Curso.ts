import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { User } from './Usuario';

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    IDGrade:number;
    @Column()
    Year: Date;
    @Column()
    LevelGrade: string;
    @Column()
    NameGrade: string;
    @ManyToOne(type=>User,IDDirector=>IDDirector.grades)
    IDDirector: User;
}