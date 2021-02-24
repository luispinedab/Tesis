import { Component, OnInit} from '@angular/core';
import {ExperienciasEscolares} from '../../../models/ExperienciasEscolares';
import {Hermanos} from '../../../models/Hermanos';
import {GradesService} from '../../../services/grades.service';
import {FormArray,FormControl,FormGroup,FormBuilder, Validators}  from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from './dialog-name-prompt/dialog-name-prompt.component';
import { FormExperienciasComponent } from './FormExperiencias/dialog-name-prompt.component';
import {DepartamentosService} from '../../../services/departamentos.service';
import {InfoestudianteService} from '../../../services/infoestudiante.service';

@Component({
  selector: 'ngx-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{
  checks: any=[
    {description: 'Padre', value: 'Padre'},
    {description: 'Madre', value: 'Madre'},
    {description: 'Hermanos', value: 'Hermanos'},
    {description: 'Otros', value: 'Otros'}
  ]
  exobjeto:ExperienciasEscolares;
  Herobjeto:Hermanos;
  idlastinfo:any;
  quienes:boolean=true;
  p3:boolean=true; 
  grades:any=[];
  lugares:any=[];
  ciudades: any=[];
  arreglo: any = [];
  names: string[] = [];
  experiences: string[] = []; 
  miFormulario: FormGroup = this.fb.group({
    Nombres: ['',[Validators.required]],
    PrimerApellido:['',[Validators.required]],
    SegundoApellido:['',[Validators.required]],
    Documento:['',[Validators.required]],
    TipoDocumento:['',[Validators.required]],
    DepartamentodeExpedicion:['',[Validators.required]],
    CiudaddeExpedicion:['',[Validators.required]],
    DepartamentodeNacimiento:['',[Validators.required]],
    CiudaddeNacimiento:['',[Validators.required]],
    Sexo:['',[Validators.required]],
    Edad:['',[Validators.required]],
    RH:['',[Validators.required]],
    Direccion:['',[Validators.required]],
    Barrio:['',[Validators.required]],
    Telefono:['',[Validators.required]],
    Estrato:['',[Validators.required]],
    Sisben:['',[Validators.required]],
    GradoaIngresar:['',[Validators.required]],
    EPS:['',[Validators.required]],
    CajaCompensacion:['',[Validators.required]],
    FechadeNacimiento:['',[Validators.required]],
    vivecon:['',[Validators.required]],
    Quienes:['',],
    NombrePadre:['',[Validators.required]],
    FechadeNacimientoP:['',[Validators.required]],
    IdentificacionPadre:['',[Validators.required]],
    ProfesionPadre:['',[Validators.required]],
    EmpresaPadre:['',[Validators.required]],
    CargoPadre:['',[Validators.required]],
    TelefonoCelularPadre:['',[Validators.required]],
    MailPadre:['',[Validators.required]],
    NombreMadre:['',[Validators.required]],
    FechadeNacimientoM:['',[Validators.required]],
    IdentificacionMadre:['',[Validators.required]],
    ProfesionMadre:['',[Validators.required]],
    EmpresaMadre:['',[Validators.required]],
    CargoMadre:['',[Validators.required]],
    TelefonoCelularMadre:['',[Validators.required]],
    MailMadre:['',[Validators.required]],
    Pregunta1:['',[Validators.required]],
    Pregunta2:['',[Validators.required]],
    Pregunta3:['',[Validators.required]],
    Pregunta31:['',],
    Pregunta32:['',]
  })
  ngOnInit():void{
    this.miFormulario.controls.vivecon.setValue([]);
    this.getCursos();
    this.departamentoService.getDepartamentos().subscribe(
      res=>{
        console.log(res);
        this.arreglo=res;
          for(let u of this.arreglo){
            this.departamentos.push(u.Departament);
           }  
      },
      err =>console.error(err)
    );
    this.departamentoService.getCiudades().subscribe(
    res=>{
          this.lugares=res;
    }
    )
    this.miFormulario.get('vivecon')?.valueChanges.subscribe(
      res=>{
        
        this.quienes=true;
          if(res.includes('Otros'))
          {
            this.quienes=false;
          }
      })
    this.miFormulario.get('DepartamentodeExpedicion')?.valueChanges.subscribe(
      Departamento=>{
      this.miFormulario.get('CiudaddeExpedicion')?.reset('');
        this.ciudades=[];
        this.arreglo.forEach(element => {
            if(element.Departament==Departamento){
              var IDdepa=element.IDDepartament;
                for(let u of this.lugares){
                        if(IDdepa==u.IDDepartament.IDDepartament){
                          this.ciudades.push(u.City);
                        }
                    }  
        }
        });
      }
    )
    this.miFormulario.get('DepartamentodeNacimiento')?.valueChanges.subscribe(
      Departamento=>{
      this.miFormulario.get('CiudaddeNacimiento')?.reset('');
        this.ciudades=[];
        this.arreglo.forEach(element => {
            if(element.Departament==Departamento){
              var IDdepa=element.IDDepartament;
                for(let u of this.lugares){
                        if(IDdepa==u.IDDepartament.IDDepartament){
                          this.ciudades.push(u.City);
                        }
                    }  
        }
        });
      }
    )
  }
  departamentos:string[]=[];
  constructor(private dialogService: NbDialogService,private fb:FormBuilder,private departamentoService:DepartamentosService,private gradesService:GradesService,private infoestudianteService:InfoestudianteService) { }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }
 
  getCursos(){
    this.gradesService.getNivelCursos().subscribe(
      res=>{
        var cursos1;
        cursos1 =res;
        cursos1.forEach(element => {
          this.grades.push(element.levelgrade);
        });
    })
  }
  open3() {
    this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(name => name && this.names.push(name));
  }
  reiniciarhermanos(){
    this.names=[];
  }
  reiniciarexperiencias()
  {
    this.experiences=[];
  }
  formexperiencias()
  {
    this.dialogService.open(FormExperienciasComponent)
      .onClose.subscribe(experience => experience && this.experiences.push(experience));
  }
  getlastinfoestudiante(){
    this.infoestudianteService.getlastinfoEstudiante().subscribe(
      res=>{
          this.idlastinfo = res;
          this.experiences.forEach(element => {
            this.exobjeto=new ExperienciasEscolares();
            this.exobjeto.NombredelColegio=element[0];
            this.exobjeto.DirecciondelColegio=element[1];
            this.exobjeto.TelefonodelColegio=element[2];
            this.exobjeto.AñosCursados=element[3];
            this.exobjeto.IDInfoEstudiante=this.idlastinfo.IDInfoEstudiante;
            this.infoestudianteService.saveExperienciasEscolares(this.exobjeto)
            .subscribe(
              res =>{
                console.log(res);
              },
              err => console.error(err)
            )
          });
          this.names.forEach(element => {
            this.Herobjeto=new Hermanos();
            this.Herobjeto.NombreHermano=element[0];
            this.Herobjeto.EdadHermano=element[1];
            this.Herobjeto.CursoHermano=element[2];
            this.Herobjeto.IDInfoEstudiante=this.idlastinfo.IDInfoEstudiante;
            this.infoestudianteService.saveHermanos(this.Herobjeto)
            .subscribe(
              res =>{
                console.log(res);
              },
              err => console.error(err)
            )
          });
          
      },
      err =>console.error(err)
    );
  }
  submitinfoestudiante(){
    this.infoestudianteService.saveInfoEstudiante(this.miFormulario.value)
    .subscribe(
      res =>{
        console.log(res);
        this.getlastinfoestudiante();
      },
      err => console.error(err)
    )
  }
  
  
  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.submitinfoestudiante();
  }
  getvalues(){
    console.log(this.experiences);
  }

}
