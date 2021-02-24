import { Component, OnInit } from '@angular/core';
import {SubjectsService} from '../../../services/subjects.service';
import {Router} from '@angular/router';
import {Subject} from '../../../models/Subject';
import {SmartTableData} from '../../../@core/data/smart-table';
import { Comment, templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'ngx-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
     cell1:any="";
     entra:any="";
     searchArea:any="";
     searchAño:any="";
     searchMateria:any="";
       listaValcursos: any=[];
      listaValasignaturas: any=[];
      listaValcursos1: any=[];
      listaValasignaturas1: any=[];
     ValorEditorMateria:any=0;
     cellArea:any=[];
     i:any=0;
  settings ={
    add: {
      addButtonContent:    '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
        defaultValue: "Select",
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
          this.searchAño=search;    
          if(cell==search)
          {
           return true;
         } else {
           return false;
         } 
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
          if(cell.NameGrade==search)
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
      IDArea: {
        title: 'Area',
        defaultValue: "Select",
        editor:
        {
          tagName: 'aaa',
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
            return cell.Area; 
            
          } catch (error) {
            return "pepito";
          }
         },
         filterFunction: (cell,search) => {
           
          this.searchArea=search;
          if (cell.IDArea == search || search == '') {
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
   objeto:Subject={};
  Area: any=[];
  areas:any=[];
  subjects:any=[];
  usuarios:any=[];
  cursos:any=[];
  grades1:any=[];
  supertoTable:Subject[]; 
  subjectstoTable:Subject[]; 
  nombreasignaturas:any=[];
  year: any=[]; 
  yearoption: any=[];
  constructor(private service: SmartTableData, private subjectsService:SubjectsService,private router:Router) {
    this.subjectstoTable=new Array<Subject>();
    this.supertoTable=new Array<Subject>();
   }

  ngOnInit(): void {
    this.getAreas();
    this.getNameSubjects();
    this.getGrades();
    this.getYears();
    this.getUsers();
    this.getSubjects();
  }

  getSubjects(){
    this.subjectstoTable=[];
    this.subjectsService.getAsignaturas().subscribe( 
      res=>{
      this.subjects = this.prepareDatatoTable(res);
      },
      err =>console.error(err)
      );
      
  }
  prepareDatatoTable(subjects:any):any{
    
    subjects.forEach((element,index) => {
        this.objeto=new Subject();
        this.objeto.IDGrade=element.IDGrade;
        this.objeto.IDNameSubject=element.IDNameSubject;
        this.objeto.IDArea=element.IDNameSubject.IDArea;
        this.objeto.IDTeacher=element.IDTeacher;
        this.objeto.Year=element.Year;
        this.objeto.IDSubject=element.IDSubject;
        this.subjectstoTable.push(this.objeto);
    });
    return this.subjectstoTable;
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
      if(this.grades1.includes(u.NameGrade)==false)
      { this.listaValcursos1.push({value:u.IDGrade,title:u.NameGrade});
        this.listaValcursos.push({value:u.IDGrade,title:u.NameGrade});
        this.settings.columns.IDGrade.filter.config.list.push({value:u.NameGrade,title:u.NameGrade});
        this.settings = Object.assign({}, this.settings);   
      }
      this.grades1.push(u.NameGrade);   
     
    }  
    }
    );
  }
    getYears(){
    
    this.subjectsService.getCursos().subscribe(
      res=>{
        this.cursos =res;
        this.settings.columns.Year.editor.config.list=[{value:"Select",title:"Select"}]
    for(let u of this.cursos){
       if(this.year.includes(u.Year)==false)
       {    
            this.settings.columns.Year.filter.config.list.push({value:u.Year,title:u.Year});
            this.settings.columns.Year.editor.config.list.push({value:u.Year,title:u.Year});
            this.settings = Object.assign({}, this.settings);
       }
      this.year.push(u.Year);
      this.yearoption.push({Year:u.Year,Grade:u.NameGrade,IDGrade:u.IDGrade});

    }  
    }
    );
  }
   
      
   
  getAreas(){
    this.subjectsService.getAreas().subscribe(
      res=>{
        this.areas =res;
        this.settings.columns.IDArea.editor.config.list=[{value:"Select",title:"Select"}]
    for(let u of this.areas){
      this.settings.columns.IDArea.editor.config.list.push({value:u.IDArea,title:u.Area});
      this.settings.columns.IDArea.filter.config.list.push({value:u.IDArea,title:u.Area});
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
      this.listaValasignaturas1.push({value:u.IDNameSubject,title:u.namesubject});
      this.listaValasignaturas.push({value:u.IDNameSubject,title:u.namesubject});
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
        },
        err=>console.error(err)
      )
    } else {
      event.confirm.reject();
    }
   
  }
  onCreateConfirm(event):void { 
    
    var yaesta=false;
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
       var newregistry = event.newData;
       this.subjects.forEach(element => {
         if(element.Year==newregistry.Year && element.IDGrade.IDGrade==newregistry.IDGrade && element.IDNameSubject.IDNameSubject==newregistry.IDNameSubject)
         {window.alert("La materia ya fue asignada.");
            yaesta=true;
          }
       });

       if(yaesta) {
        event.confirm.reject();
        location.reload();
  }
  else{
    this.subjectsService.saveAsignaturas(newregistry)
    .subscribe(
      res => {
        
    this.getSubjects();
      },
      err => console.error(err)
    )
    }
    } else {
      event.confirm.reject();
    }
  } 
  updatelista1(data:any,lista:any){
    var encuentra=false;
    for(var i =0; i < data.length;i++){
        encuentra = false;
        for(var j =0; j < this.listaValcursos.length;j++){
            if(data[i].title == this.listaValcursos[j].title){
                encuentra = true;
                break;
            }
        }
        if(!encuentra){
          lista.innerHTML=" ";
            this.listaValcursos=data;
            data.forEach(element => {
              var opt = document.createElement('option');
                  opt.text = element.title;
                  opt.value = element.value;
                  lista.appendChild(opt);});
          break;
        }
    }
    if(encuentra){
    }       
  }
  updatelistafiltroCurso(data:any,lista:any){
    var encuentra=false;
    for(var i =0; i < data.length;i++){
        encuentra = false;
        for(var j =0; j < this.listaValcursos1.length;j++){
            if(data[i].title == this.listaValcursos1[j].title){
                encuentra = true;
                break;
            }
        }
        if(!encuentra){
          lista.innerHTML=" ";
            this.listaValcursos1=data;
            data.forEach(element => {
              var opt = document.createElement('option');
                  opt.text = element.title;
                  opt.value = element.value;
                  lista.appendChild(opt);});
          break;
        }
    }
    if(encuentra){
    }       
  }
  updatelista(data:any,lista:any){
    var encuentra=false;
    for(var i =0; i < data.length;i++){
        encuentra = false;
        for(var j =0; j < this.listaValasignaturas.length;j++){
            if(data[i].title == this.listaValasignaturas[j].title){
                encuentra = true;
                break;
            }
        }
        if(!encuentra){
          lista.innerHTML=" ";
            this.listaValasignaturas=data;
            data.forEach(element => {
              var opt = document.createElement('option');
                  opt.text = element.title;
                  opt.value = element.value;
                  lista.appendChild(opt);});
          break;
        }
    }
    if(encuentra){
    }

          
  }
  updatelistafiltroMateria(data:any,lista:any){
    var encuentra=false;
    for(var i =0; i < data.length;i++){
        encuentra = false;
        for(var j =0; j < this.listaValasignaturas1.length;j++){
            if(data[i].title == this.listaValasignaturas1[j].title){
                encuentra = true;
                break;
            }
        }
        if(!encuentra){
          lista.innerHTML=" ";
            this.listaValasignaturas1=data;
            data.forEach(element => {
              var opt = document.createElement('option');
                  opt.text = element.title;
                  opt.value = element.value;
                  lista.appendChild(opt);});
          break;
        }
    }
    if(encuentra){
    }

          
  }
  AddSelect(data:any,lista:any){
      var opt = document.createElement('option');
                  opt.text = 'Select';
                  opt.value = '';
            var tamañolista= lista.getElementsByTagName('option').length;
                  if(tamañolista==data.length)
                      { var segundo_opt = lista.getElementsByTagName('option')[0];
                        lista.insertBefore(opt,segundo_opt);
                      }
  }

  readclick(event):void{
    var listaedit:any=[];
    var listaedit1:any=[];
     listaedit = document.getElementsByClassName('nb-edit');
     listaedit1 = document.getElementsByClassName('ng2-smart-action ng2-smart-action-edit-edit ng-star-inserted');
    for (let index = 0; index < listaedit.length; index++) {
      if(listaedit[index]==event.srcElement)
      {
      this.settings.columns.Year.defaultValue="Select";
      this.settings.columns.IDArea.defaultValue="Select";
      this.listaValcursos=[];
      this.listaValasignaturas=[];
      }
    }
     for (let index = 0; index < listaedit1.length; index++) {
      if(listaedit1[index]==event.srcElement)
      {
      this.settings.columns.Year.defaultValue="Select";
      this.settings.columns.IDArea.defaultValue="Select";
      this.listaValcursos=[];
      this.listaValasignaturas=[];
      }
    }
    var listai = document.getElementsByTagName('i');
    var buttonplus = listai[0];
    buttonplus.id = "buttonplus";
    var listaCancelar1=listai[2];
    var listaA = document.getElementsByTagName('a');
    var listaPlusButton=listaA[50];
    var listaSelect = document.getElementsByTagName('SELECT');
    var filtrocurso=listaSelect[1];
    var filtroMateria=listaSelect[3];
     var editorAño=listaSelect[5];
    var editorCurso=listaSelect[6];
    var editorArea=listaSelect[7];
    var editorMateria=listaSelect[8];
    var editorDocente=listaSelect[9];
    filtrocurso.id="filtroCurso";
    filtroMateria.id="filtroMateria";
    var listafiltroMateria = document.getElementById('filtroMateria') as HTMLInputElement;
    var listafiltroCurso = document.getElementById('filtroCurso') as HTMLInputElement;
    
    if(event.srcElement==buttonplus || event.srcElement==listaPlusButton)
    {
      this.settings.columns.Year.defaultValue="Select";
      this.settings.columns.IDArea.defaultValue="Select";
      this.listaValcursos=[];
      this.listaValasignaturas=[];
    }
    
   switch (this.searchAño) {
     case '2020': 
                  var opcion: any=[{value:0,title:''}];
                  this.yearoption.forEach(element => {
                    if(element.Year=='2020')
                    {
                      opcion.push({value:element.Grade,title:element.Grade+" "})
                      
                    }
                  });
                  this.updatelistafiltroCurso(opcion,listafiltroCurso); 
                  this.AddSelect(opcion,listafiltroCurso);
                  listafiltroCurso[1].style.display='none';         
       break;
       case '2021':
                  var opcion: any=[{value:0,title:''}];
                  this.yearoption.forEach(element => {
                    if(element.Year=='2021')
                    {
                      opcion.push({value:element.Grade,title:element.Grade+" "})
                    }
                  }); 
                  this.updatelistafiltroCurso(opcion,listafiltroCurso); 
                  this.AddSelect(opcion,listafiltroCurso); 
                  listafiltroCurso[1].style.display='none';      
       break;
         case '2022': 
                  var opcion: any=[{value:0,title:''}];
                  this.yearoption.forEach(element => {
                    if(element.Year=='2022')
                    {
                      opcion.push({value:element.Grade,title:element.Grade+" "})
                    }
                  });
                  this.updatelistafiltroCurso(opcion,listafiltroCurso);
                  this.AddSelect(opcion,listafiltroCurso);
                  listafiltroCurso[1].style.display='none';            
       break;
   
     default:     
      break;
   }
    
    try {
      
      editorDocente.id="editorDocente";
      editorAño.id="editorAño";
      editorCurso.id="editorCurso";
      editorArea.id="editorArea";
      editorMateria.id="editorMateria";
      var listaeditorDocente= document.getElementById('editorDocente') as HTMLInputElement;
      var listaeditorAño = document.getElementById('editorAño') as HTMLInputElement;
      var listaeditorCurso = document.getElementById('editorCurso') as HTMLInputElement;
      var elemento = document.getElementById('editorArea') as HTMLInputElement;
      var listaMateria = document.getElementById('editorMateria') as HTMLInputElement;
      var ValueEditorAño=listaeditorAño.value;
      var ValueEditorDocente=listaeditorDocente.value;
      var ValueEditorCurso=listaeditorCurso.value;
      var ValueEditorArea=elemento.value;
      var ValueMateria=listaMateria.value;
    
     
      listaeditorCurso.disabled=true;
      if(ValueEditorAño!= '')
      { listaeditorCurso.disabled=false;
        switch (ValueEditorAño) {
           case '2020': 
                  var opcion: any=[{value:0,title:''}];
                  this.yearoption.forEach(element => {
                    if(element.Year=='2020')
                    {
                      opcion.push({value:element.IDGrade,title:element.Grade+" "})
                    }
                  });
                
                  this.updatelista1(opcion,listaeditorCurso); 
                  listaeditorCurso[0].style.display='none';
                  
       break;
       case '2021': 
                  var opcion: any=[{value:0,title:''}];
                  this.yearoption.forEach(element => {
                    if(element.Year=='2021')
                    {
                      opcion.push({value:element.IDGrade,title:element.Grade+" "});
                    }
                  });    
                  this.updatelista1(opcion,listaeditorCurso);   
                  listaeditorCurso[0].style.display='none';    
       break;
         case '2022': 
                  var opcion: any=[{value:0,title:''}];
                  this.yearoption.forEach(element => {
                    if(element.Year=='2022')
                    {
                      opcion.push({value:element.IDGrade,title:element.Grade+" "});
                    }
                  });
                  this.updatelista1(opcion,listaeditorCurso);
                  listaeditorCurso[0].style.display='none';     
       break;
          default:
            break;
        }
      }
       listaMateria.disabled=true;
      if(ValueEditorArea!= '')
      { listaMateria.disabled=false;
        switch (ValueEditorArea) {
          case '1':
            var opcion: any=[{value:0,title:''},{value: 1,title:'Biología '},{value: 2,title:'Ciencias Naturales '},{value: 3, title: 'Física '},{value: 4, title: 'Química '}]; 
            this.updatelista(opcion,listaMateria);
            listaMateria[0].style.display='none';
            break;
          case '2':
            var opcion: any=[{value:0,title:''},{value: 5, title: "Ciencias Políticas y Económicas "},{value: 6, title: "Filosofía "},{value: 7, title: "Sociales "}];
            this.updatelista(opcion,listaMateria);
            listaMateria[0].style.display='none';
            break;
        case '3': 
          var opcion: any=[{value:0,title:''},{value: 8, title: "Pre Matemáticas "},{value: 9, title: "Pre Sistemas "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '4': 
          var opcion: any=[{value:0,title:''},{value: 10, title: "Pre Español "},{value: 11, title: "Pre Inglés "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '5': 
          var opcion: any=[{value:0,title:''},{value: 12, title: "Expresión Corporal "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '6': 
          var opcion: any=[{value:0,title:''},{value: 13, title: "Pre Ética y Valores "},{value: 14, title: "Pre Religión "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '7': 
          var opcion: any=[{value:0,title:''},{value: 15, title: "Pre Artes "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '8': 
          var opcion: any=[{value:0,title:''},{value: 16, title: "Pre Ciencias "},{value: 17, title: "Pre Sociales "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '9': 
          var opcion: any=[{value:0,title:''},{value: 18, title: "Artes "},{value: 19, title: "Danzas "},{value: 20, title: "Música "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '10': 
          var opcion: any=[{value:0,title:''},{value: 21, title: "Ética y Valores "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '11': 
          var opcion: any=[{value:0,title:''},{value: 22, title: "Educación Física "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '12': 
          var opcion: any=[{value:0,title:''},{value: 23, title: "Religión "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '13': 
          var opcion: any=[{value:0,title:''},{value: 24, title: "Español y Literatura "},{value: 25, title: "Francés "},{value: 26, title: "Inglés "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '14': 
          var opcion: any=[{value:0,title:''},{value: 27, title: "Álgebra "},{value: 28, title: "Aritmética "},{value: 29, title: "Cálculo "},{value: 30, title: "Matemáticas "},{value: 31, title: "Trigonometría "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '15': 
          var opcion: any=[{value:0,title:''},{value: 32, title: "Psicología "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
          case '16': 
          var opcion: any=[{value:0,title:''},{value: 33, title: "Tecnología e Informática "}];
          this.updatelista(opcion,listaMateria);
          listaMateria[0].style.display='none';
          break;
        
     }
      }
      
    } catch (error) {
    }
    
    switch (this.searchArea) {
      case '1':
      var opcion: any=[{value:0,title:''}, {value:'Biología',title:'Biología '},{value:'Ciencias Naturales',title:'Ciencias Naturales '},{value: 'Física', title: 'Física '},{value: 'Química', title: 'Química '}]; 
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria); 
      listafiltroMateria[1].style.display='none';      
      break;
      case '2':
      var opcion: any=[{value:0,title:''},{value: "Ciencias Políticas y Económicas", title: "Ciencias Políticas y Económicas "},{value: "Filosofía", title: "Filosofía "},{value: "Sociales", title: "Sociales "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '3': 
      var opcion: any=[{value:0,title:''},{value: "Pre Matemáticas", title: "Pre Matemáticas "},{value: "Pre Sistemas", title: "Pre Sistemas "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria); 
      listafiltroMateria[1].style.display='none'; 
      break;
      case '4': 
      var opcion: any=[{value:0,title:''},{value: "Pre Español", title: "Pre Español "},{value: "Pre Inglés", title: "Pre Inglés "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '5': 
      var opcion: any=[{value:0,title:''},{value: "Expresión Corporal", title: "Expresión Corporal "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '6': 
      var opcion: any=[{value:0,title:''},{value: "Pre Ética y Valores", title: "Pre Ética y Valores "},{value: "Pre Religión", title: "Pre Religión "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '7': 
      var opcion: any=[{value:0,title:''},{value: "Pre Artes", title: "Pre Artes "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '8': 
      var opcion: any=[{value:0,title:''},{value: "Pre Ciencias", title: "Pre Ciencias "},{value: "Pre Sociales", title: "Pre Sociales "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '9': 
      var opcion: any=[{value:0,title:''},{value: "Artes", title: "Artes "},{value: "Danzas", title: "Danzas "},{value: "Música", title: "Música "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '10': 
      var opcion: any=[{value:0,title:''},{value: "Ética y Valores", title: "Ética y Valores "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '11': 
      var opcion: any=[{value:0,title:''},{value: "Educación Física", title: "Educación Física "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '12': 
      var opcion: any=[{value:0,title:''},{value: "Religión", title: "Religión "}];
      var encuentra = false;
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '13': 
      var opcion: any=[{value:0,title:''},{value: "Español y Literatura", title: "Español y Literatura "},{value: "Francés", title: "Francés "},{value: "Inglés", title: "Inglés "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '14': 
      var opcion: any=[{value:0,title:''},{value: "Álgebra", title: "Álgebra "},{value: "Aritmética", title: "Aritmética "},{value: "Cálculo", title: "Cálculo "},{value: "Matemáticas", title: "Matemáticas "},{value: "Trigonometría", title: "Trigonometría "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '15': 
      var opcion: any=[{value:0,title:''},{value: "Psicología", title: "Psicología "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      case '16': 
      var opcion: any=[{value:0,title:''},{value: "Tecnología e Informática", title: "Tecnología e Informática "}];
      this.updatelistafiltroMateria(opcion,listafiltroMateria);
      this.AddSelect(opcion,listafiltroMateria);
      listafiltroMateria[1].style.display='none';  
      break;
      default:
        break;
    break;
    
 }
 
  }
  
  onSaveConfirm(event):void {
    var yaesta=false;
    try {if (window.confirm('Are you sure you want to save?') ) {
      event.confirm.resolve(event.newData);
      var newrow=event.newData;
      this.subjects.forEach(element => {
            if(element.Year==newrow.Year && element.IDGrade.IDGrade==newrow.IDGrade && element.IDNameSubject.IDNameSubject==newrow.IDNameSubject)
            {
              window.alert("La materia ya fue asignada.");
              yaesta=true;
              
            }
      });
      if(yaesta) {
        event.confirm.reject();
        location.reload();
  }
  else{
    this.subjectsService.updateAsignaturas(newrow.IDSubject,newrow)
  .subscribe(
    res =>{
  this.getSubjects();
    },
    err => console.error(err)
  )
  }
    } else {
      event.confirm.reject();
    }
      
    } catch (error) {
    }
    
  }
}
