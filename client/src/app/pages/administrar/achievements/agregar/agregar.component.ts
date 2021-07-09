import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AchievementsService } from 'app/services/achievements.service';
import { GradesService } from 'app/services/grades.service';


@Component({
  selector: 'ngx-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  flagedit:boolean=false;
  flag:boolean=false;
  objeto:any;
  title: String;
  myObject: any;
  año:number;
  date:Date;
  materias:any=[];
  levelgrades:any=[];
  grades:any=[];
  settings:any=[];
  subjects:any=[];
  cursos:any=[];
  constructor(private gradeService:GradesService,private fb:FormBuilder,private achievementsService:AchievementsService,protected ref: NbDialogRef<AgregarComponent>) { }
  
  miFormulario: FormGroup = this.fb.group({
    IDLevelGrade: ['',[Validators.required]],
    IDSubject: ['',[Validators.required]],
    Achievement:['',[Validators.required]]
  })
  ngOnInit(): void {
    this.getinfo();
    this.miFormulario.get('IDLevelGrade')?.valueChanges.subscribe(
      Curso=>{
        console.log("entraaaa")
        this.miFormulario.get('IDSubject')?.reset('');
        this.materias=[];
        this.subjects.forEach(element => {
          if(element.IDGrade.IDLevelGrade.IDLevelGrade==Curso &&element.Year==this.año.toString())
          {
            this.materias.push({value:element.IDSubject,title:element.IDNameSubject.namesubject});
            this.flag=true;
          }
        });
      }
    )
    
    if(this.myObject!=null)
    { this.flagedit=true;
      this.objeto=this.myObject;
      this.miFormulario.patchValue({'IDLevelGrade':this.objeto.IDLevelGrade.IDLevelGrade})
      this.miFormulario.patchValue({'Achievement':this.objeto.Achievement})
      console.log(this.materias);
      this.miFormulario.patchValue({'IDSubject':this.objeto.IDSubject.IDSubject})
      console.log(this.miFormulario.value);
    }
    
   
  }
  getinfo(){
    this.achievementsService.getAsignaturas().subscribe(res=>{
      this.subjects=res;
      console.log(res);
    })
    this.gradeService.getCursos().subscribe(res=>{
      this.cursos=res;
    })
    var dt=new Date;
    this.año=dt.getFullYear();
    this.achievementsService.getNivelCursos().subscribe(res=>{
      this.levelgrades=res;
      this.flag=true;
      console.log(this.levelgrades);
    },
    err=>console.error(err)
    )
    
  }
  cancel() {
    this.ref.close();
  }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }
  guardar(){
    var a=[]
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    console.log(this.miFormulario.value)
    this.ref.close(this.miFormulario.value);
    
  }
}
