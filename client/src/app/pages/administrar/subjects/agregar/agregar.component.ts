import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators}  from '@angular/forms';
import {Router} from '@angular/router';
import decode from 'jwt-decode';
import { NbDialogRef } from '@nebular/theme';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { ObservacionesService } from 'app/services/observaciones.service';
import { SubjectsService } from 'app/services/subjects.service';
import { getTsBuildInfoEmitOutputFilePath } from 'typescript';

@Component({
  selector: 'ngx-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent1 implements OnInit {
  flag:boolean=false;
  title: String;
  myObject: any;
  Anios1:any =[];
  años:any=[];
  grades:any=[];
  Areas:any=[];
  Namesubjects:any=[];
  Docentes:any=[];
  Docentes1:any=[];
  asignaturas:any=[];
  flagedit:boolean=false;
  cursos:any=[];
  nombreasignaturas:any=[];



  constructor(private fb:FormBuilder,private subjectsService:SubjectsService,protected ref: NbDialogRef<AgregarComponent1>) { }
  miFormulario: FormGroup = this.fb.group({
    Year:['',[Validators.required]],
    IDGrade:['',[Validators.required]],
    Area: ['',],
    IDNameSubject: ['',[Validators.required]],
    IDTeacher: ['',[Validators.required]],
  })
  ngOnInit(): void {
    this.getinfo();
    this.miFormulario.get('Year')?.valueChanges.subscribe(
      Año=>{
        this.miFormulario.get('IDGrade')?.reset('');
        this.grades=[];
         this.cursos.forEach(element => {
            if(element.Year==Año)
            {
              this.grades.push(element);
            }
         });
      }
    )
    this.miFormulario.get('Area')?.valueChanges.subscribe(
      Area=>{
        this.miFormulario.get('IDNameSubject')?.reset('');
        this.Namesubjects=[];
        console.log(this.nombreasignaturas,Area)
         this.nombreasignaturas.forEach(element => {
            if(element.IDArea.IDArea==Area)
            {
              this.Namesubjects.push(element);
            }
         });
      }
    )
  }
  getinfo(){
    this.subjectsService.getAsignaturas().subscribe(res=>{
      this.asignaturas=res;
      console.log(this.asignaturas);
      if(this.asignaturas.length==0)
        {
          var anio= new Date();
          this.Anios1.push(anio.getFullYear());
            
        }
        else{
          this.asignaturas.forEach(element => {
            if(this.años.includes(element.Year)==false)
            {
              this.Anios1.push(element.Year);
            }
            this.años.push(element.Year);   
          });
          console.log(this.Anios1);
        }
    })
    this.subjectsService.getCursos().subscribe(res=>{
      this.cursos=res;
    },err=>console.error(err))
    this.subjectsService.getAreas().subscribe(res=>{
      this.Areas=res;
    },err=>console.error(err))
    this.subjectsService.getNombreAsignaturas().subscribe(res=>{
      this.nombreasignaturas=res;
    },err=>console.error(err))
    this.subjectsService.getUsuarios().subscribe(res=>{
      this.Docentes1=res;
      for(let u of this.Docentes1){
        if(u.IDUserType.UserType=="Docente" && u.UserState=='1'){
        this.Docentes.push({value:u.IDUser,title:u.Name+" "+u.Lastname});
        }
      }
    })
    if(this.myObject!=null)
    { this.flagedit=true;
      this.miFormulario.patchValue({'Year':this.myObject.Year})
      this.miFormulario.patchValue({'IDGrade':this.myObject.IDGrade})
      this.miFormulario.patchValue({'Area':this.myObject.IDArea.IDArea})
      this.miFormulario.patchValue({'IDNameSubject':this.myObject.IDNameSubject.IDNameSubject})
      this.miFormulario.patchValue({'IDTeacher':this.myObject.IDTeacher.IDUser})
    }
  }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }
  cancel() {
    this.ref.close();
  } 
  guardar(){
    console.log(this.miFormulario.value);
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    console.log(this.miFormulario.value)
    this.ref.close(this.miFormulario.value);
  }
}
