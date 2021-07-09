import {ViewEntity, ViewColumn,Connection} from "typeorm";
import {Subject} from './Asignatura';
import {Grade} from './Curso';
import {SubjectArea} from './SubjectArea';
import {NameSubject} from './NombreAsignatura';
import {User} from './Usuario';

@ViewEntity("viewsubject",{ 
    expression:  (connection: Connection) => connection.createQueryBuilder()
    .select("S.IDSubject", "ID")
    .addSelect("S.Year", "Year")
    .addSelect("G.NameGrade", "Curso")
    .addSelect("A.Area", "Area")
    .addSelect("N.namesubject", "Asignatura")
    .addSelect('CONCAT(U.Name,U.LastName)', 'Profesor')
    .from(Subject, "S")
    .leftJoin(Grade, "G", "S.IDGrade = G.IDGrade")
    .leftJoin(NameSubject, "N", "S.IDNameSubject = N.IDNameSubject")
    .leftJoin(SubjectArea, "A", "N.IDArea = A.IDArea")
    .leftJoin(User, "U", "S.IDTeacher = U.IDUser")

})
export class ViewAsignatura {

    @ViewColumn()
    ID: number;

    @ViewColumn()
    Year: string;

    @ViewColumn()
    Profesor: string;

    @ViewColumn()
    Curso: string;

    @ViewColumn()
    Area: string;

    @ViewColumn()
    Asignatura: string;

}