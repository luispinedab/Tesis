import {Entity, Column, PrimaryGeneratedColumn,OneToMany,OneToOne,JoinColumn,ManyToOne} from 'typeorm';
import {ExperienciasEscolares} from './ExperienciasEscolares';
import {Citas}from './Citas';
import {Hermanos} from './Hermanos';
import {Remark} from './Observaciones';
import {Aspirantes} from './Aspirante';
import {Grade} from './Curso';
import { ratings } from './Notas';
import { absences } from './Fallas';
@Entity("infostudent")
export class InfoStudent {
    @PrimaryGeneratedColumn()
    IDInfoEstudiante:number;
    @Column()
    Nombres: string;
    @Column()
    PrimerApellido: string;
    @Column()
    SegundoApellido: string;
    @Column()
    TipoDocumento: string;
    @Column()
    Documento: string;
    @Column()
    DepartamentodeExpedicion: string;
    @Column()
    CiudaddeExpedicion: string;
    @Column()
    RH: string;
    @Column()
    Edad: Number;
    @Column()
    FechadeNacimiento: Date;
    @Column()
    DepartamentodeNacimiento: string;
    @Column()
    CiudaddeNacimiento: string;
    @Column()
    Sexo: string;
    @Column()
    Barrio: string;
    @Column()
    Direccion: string;
    @Column()
    EPS: string;
    @Column()
    Telefono: string;
    @Column()
    CajaCompensacion: string;
    @Column()
    Estrato: string;
    @Column()
    Sisben: string;
    @Column()
    GradoaIngresar: string;
    @Column()
    vivecon: string;
    @Column({nullable: true})
    Quienes: string;
    @Column()
    NombrePadre: string;
    @Column()
    FechadeNacimientoP: Date;
    @Column()
    IdentificacionPadre: string;
    @Column()
    ProfesionPadre: string;
    @Column()
    EmpresaPadre: string;
    @Column()
    CargoPadre: string;
    @Column()
    TelefonoCelularPadre: string;
    @Column()
    MailPadre: string;
    @Column()
    NombreMadre: string;
    @Column()
    FechadeNacimientoM: Date;
    @Column()
    IdentificacionMadre: string;
    @Column()
    ProfesionMadre: string;
    @Column()
    EmpresaMadre: string;
    @Column()
    CargoMadre: string;
    @Column()
    TelefonoCelularMadre: string;
    @Column()
    MailMadre: string;
    @Column()
    Pregunta1: string;
    @Column()
    Pregunta2: string;
    @Column()
    Pregunta3: string;
    @Column({nullable: true})
    Pregunta31: string;
    @Column({nullable: true})
    Pregunta32: string;
    @Column()
    FechadeCreacion: Date;
    @Column()
    FechadeModificacion: Date;
    @OneToMany(type=> ExperienciasEscolares, experienciasescolare => experienciasescolare.IDInfoEstudiante)
    experienciasescolares:ExperienciasEscolares[];
    @OneToMany(type=> Hermanos, hermano => hermano.IDInfoEstudiante)
    hermanos:Hermanos[];
    @OneToMany(type=> Citas, cita => cita.IDInfoEstudiante)
    citas:Citas[];
    @OneToMany(type=> Remark, remark => remark.IDInfoEstudiante)
    remarks:Remark[];
    @OneToMany(type=> ratings, nota => nota.IDStudent)
    notas:ratings[];
    @OneToMany(type=> absences, falla => falla.IDStudent)
    fallas:absences[];
    @OneToOne(() => Aspirantes)
    @JoinColumn()
    IDAspirante: Aspirantes;
    @ManyToOne(type=>Grade,idgrade=>idgrade.InfoStudents)
    IDGrade:Grade;
    @Column("decimal", { precision: 5, scale: 2 })
    Nota: number;
}