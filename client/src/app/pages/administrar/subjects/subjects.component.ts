import { Component, OnInit } from '@angular/core';
import {SubjectsService} from '../../../services/subjects.service';
import {Router} from '@angular/router';
import {SmartTableData} from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
     searchArea:any="";
     searchMateria:any="";
  settings ={
    add: {
      addButtonContent:    '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
      click:true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Year: {
        title: 'Año',
        type: 'string',
        addable: 'true',
        defaultValue: "2021",
        editor:
        {selectText: 'Select',
          type: 'list',
          config:
          { 
            list: []
          },  
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: []
          },
        },
      },
      IDGrade: {
        
        title: 'Curso',
        editor:
        {
          type: 'list',
          config:
          { selectText: 'Select',
            list: []
          },  
        },
          filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: []
          },
        },
        filterFunction(cell?: any, search?: string,): boolean {      
          if(cell.IDGrade==search)
          {
           return true;
         } else {
           return false;
         } 
       },
        valuePrepareFunction: (data) => {
        return data.NameGrade;
      },
      },
      'IDNameSubject.IDArea': {
        title: 'Area',
        editor:
        {
        type: 'list',
          config:
          { selectText: 'Select',
            list: []
          },  
        },
          filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: []
          },
        },
      
        valuePrepareFunction: (cell,row) => {
       
          try {
            return row.IDNameSubject.IDArea.Area 
          } catch (error) {
            return "pepito";
          }
         },
         filterFunction: (cell,search) => {  
          console.log("search:"+search); 
          this.searchArea=search;
          if( search ==cell)
          {
           return true;
         } else {  
           
           return false;
         } 
       },
        
      },
      IDNameSubject:{
        title: 'Nombre Asignatura',
        editor:
        {selectText: 'Select',
          type: 'list',
          config:
          { 
            list: []
          },  
        },
          filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: []
          },
        },
        filterFunction:(cell,search)=>{  
          console.log("cell:"+cell.namesubject); 
          this.searchMateria=search;    
          if(cell.namesubject==search)
          {
            
           return true;
         } else {
           return false;
         } 
       },
       
        valuePrepareFunction: (data) => {
        return data.namesubject;
      },
      },
      IDTeacher:{
        title: 'Docente',
        editor:
        {selectText: 'Select',
          type: 'list',
          config:
          { 
            list: []
          },  
        },
          filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: []
          },
        },
        filterFunction(cell?: any, search?: string): boolean {          
          if(cell.IDUser==search)
          {
           return true;
         } else {
           return false;
         } 
       },
        valuePrepareFunction: (data) => {
        return data.Name +" "+ data.Lastname;
      },

      },
     
    }
  }
   a;
  Area: any=[];
  areas:any=[];
  subjects:any=[];
  usuarios:any=[];
  cursos:any=[];
  nombreasignaturas:any=[];
  year: any=[2020,2021,2022]; 
  constructor(private service: SmartTableData, private subjectsService:SubjectsService,private router:Router) { }

  ngOnInit(): void {
    
    this.getYears();
    this.getAreas();
    this.getNameSubjects();
    this.getGrades();
    this.getUsers();
    this.getSubjects();
  }

  getSubjects(){
    this.subjectsService.getAsignaturas().subscribe( 
      res=>{
      this.subjects = res;
      },
      err =>console.error(err)
      );
  }
  getYears(){
    for(let u of this.year){
      this.settings.columns.Year.filter.config.list.push({value:u,title:u});
      this.settings.columns.Year.editor.config.list.push({value:u,title:u});
    }
  }
  getUsers(){
    this.subjectsService.getUsuarios().subscribe( 
      res=>{
        this.usuarios =res;
        for(let u of this.usuarios){
          if(u.IDUserType.UserType=="Docente" && u.UserState=='1'){
          this.settings.columns.IDTeacher.editor.config.list.push({value:u.IDUser,title:u.Name+" "+u.Lastname});
          this.settings.columns.IDTeacher.filter.config.list.push({value:u.IDUser,title:u.Name+" "+u.Lastname});
          this.settings = Object.assign({}, this.settings);
          }
        }
      }
      )
  }
  getGrades(){
    
    this.subjectsService.getCursos().subscribe(
      res=>{
        this.cursos =res;
    for(let u of this.cursos){
      this.settings.columns.IDGrade.editor.config.list.push({value:u.IDGrade,title:u.NameGrade});
      this.settings.columns.IDGrade.filter.config.list.push({value:u.IDGrade,title:u.NameGrade});
      this.settings = Object.assign({}, this.settings);
      
    }  
    }
    );
  }
  getAreas(){
    this.subjectsService.getAreas().subscribe(
      res=>{
        this.areas =res;
    for(let u of this.areas){
      this.settings.columns['IDNameSubject.IDArea'].editor.config.list.push({value:u.IDArea,title:u.Area});
      this.settings.columns['IDNameSubject.IDArea'].filter.config.list.push({value:u.IDArea,title:u.Area});
      this.settings = Object.assign({}, this.settings);
    } 
    }
    );
  }
  getNameSubjects(){
    this.subjectsService.getNombreAsignaturas().subscribe(
      res=>{
        this.nombreasignaturas =res;
    for(let u of this.nombreasignaturas){
      this.settings.columns.IDNameSubject.editor.config.list.push({value:u.IDNameSubject,title:u.namesubject});
      this.settings.columns.IDNameSubject.filter.config.list.push({value:u.namesubject,title:u.namesubject});
      this.settings = Object.assign({}, this.settings);
      
    }  
    }
    );
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      let index = this.subjects.indexOf(event.data);
      var selectedrow= this.subjects[index];
      this.subjectsService.deleteAsignaturas(selectedrow.IDSubject)
      .subscribe(
        res=>{
          console.log(res);
        },
        err=>console.error(err)
      )
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event):void { 
  
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
       var newregistry = event.newData;
       console.log(newregistry);
      this.subjectsService.saveAsignaturas(newregistry)
    .subscribe(
      res => {
        this.getSubjects();
        console.log(res);
      },
      err => console.error(err)
    )
    } else {
      event.confirm.reject();
    }
  } 
  hola():void{
    
    switch (this.searchArea) {
      case '1':
        var opcion: any=[ {value:'Biología',title:'Biología '},{value:'Ciencias Naturales',title:'Ciencias Naturales '},{value: 'Física', title: 'Física '},{value: 'Química', title: 'Química '}]; 
        var encuentra = false;
        
       
        for(var i =0; i < opcion.length;i++){
            encuentra = false;
            for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
                if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                    encuentra = true;
                    break;
                }
            }
            if(!encuentra){
              console.log("los arreglos no son iguales");
              this.settings.columns.IDNameSubject.filter.config.list=opcion;
              this.settings=Object.assign({},this.settings); 
              break;
            }
        }
        if(encuentra){
            console.log("si son iguales");
              
        }
        break;
      case '2':
        var opcion: any=[{value: "Ciencias Políticas y Económicas", title: "Ciencias Políticas y Económicas "},{value: "Filosofía", title: "Filosofía "},{value: "Sociales", title: "Sociales "}];
        var encuentra = false;
        for(var i =0; i < opcion.length;i++){
            encuentra = false;
            for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
                if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                    encuentra = true;
                    break;
                }
            }
            if(!encuentra){
              console.log("los arreglos no son iguales");
              this.settings.columns.IDNameSubject.filter.config.list=opcion;
              this.settings=Object.assign({},this.settings);
              break;
            }
        }
        if(encuentra){
            console.log("si son iguales");
        }

        break;
    case '3': 
      var opcion: any=[{value: "Pre Matemáticas", title: "Pre Matemáticas "},{value: "Pre Sistemas", title: "Pre Sistemas "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '4': 
      var opcion: any=[{value: "Pre Español", title: "Pre Español "},{value: "Pre Inglés", title: "Pre Inglés "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '5': 
      var opcion: any=[{value: "Expresión Corporal", title: "Expresión Corporal "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '6': 
      var opcion: any=[{value: "Pre Ética y Valores", title: "Pre Ética y Valores "},{value: "Pre Religión", title: "Pre Religión "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '7': 
      var opcion: any=[{value: "Pre Artes", title: "Pre Artes "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '8': 
      var opcion: any=[{value: "Pre Ciencias", title: "Pre Ciencias "},{value: "Pre Sociales", title: "Pre Sociales "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '9': 
      var opcion: any=[{value: "Artes", title: "Artes "},{value: "Danzas", title: "Danzas "},{value: "Música", title: "Música "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '10': 
      var opcion: any=[{value: "Ética y Valores", title: "Ética y Valores "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '11': 
      var opcion: any=[{value: "Educación Física", title: "Educación Física "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '12': 
      var opcion: any=[{value: "Religión", title: "Religión "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '13': 
      var opcion: any=[{value: "Español y Literatura", title: "Español y Literatura "},{value: "Francés", title: "Francés "},{value: "Inglés", title: "Inglés "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '14': 
      var opcion: any=[{value: "Álgebra", title: "Álgebra "},{value: "Aritmética", title: "Aritmética "},{value: "Cálculo", title: "Cálculo "},{value: "Matemáticas", title: "Matemáticas "},{value: "Trigonometría", title: "Trigonometría "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '15': 
      var opcion: any=[{value: "Psicología", title: "Psicología "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      case '16': 
      var opcion: any=[{value: "Tecnología e Informática", title: "Tecnología e Informática "}];
      var encuentra = false;
      for(var i =0; i < opcion.length;i++){
          encuentra = false;
          for(var j =0; j < this.settings.columns.IDNameSubject.filter.config.list.length;j++){
              if(opcion[i].title == this.settings.columns.IDNameSubject.filter.config.list[j].title){
                  encuentra = true;
                  break;
              }
          }
          if(!encuentra){
            console.log("los arreglos no son iguales");
            this.settings.columns.IDNameSubject.filter.config.list=opcion;
            this.settings=Object.assign({},this.settings);
            break;
          }
      }
      if(encuentra){
          console.log("si son iguales");
      }
      break;
      default:
        break;
    break;
    
 }
 
  }
  hola1(event):void {
      console.log("Row:",event);
  }
  onSaveConfirm(event):void {
    try {if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve(event.newData);
      var newrow=event.newData;
      console.log(newrow);
      this.subjectsService.updateAsignaturas(newrow.IDSubject,newrow)
    .subscribe(
      res =>{
        this.getSubjects();
        console.log(res);
      },
      err => console.error(err)
    )
    } else {
      event.confirm.reject();
    }
      
    } catch (error) {
      console.log("holamundo")
    }
    
  }
}
