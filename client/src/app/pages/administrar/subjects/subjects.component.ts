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
  settings ={
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
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
        defaultValue: "2021",
        editor:
        {selectText: 'Select',
          type: 'list',
          config:
          { 
            list: [{title:2020,value:2020},{title:2021,value:2021},{title:2020,value:2022}]
          },  
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [{title:2020,value:2020},{title:2021,value:2021},{title:2022,value:2022}]
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
        filterFunction(cell?: any, search?: any,): boolean {         
          if( search ==cell)
          {
           console.log("hola");
           return true;
         } else {
           
           console.log(cell);
           return false;
         } 
       },
        valuePrepareFunction: (cell,row) => {
          try {
            return row.IDNameSubject.IDArea.Area 
          } catch (error) {
            console.log("chao");
            return "pepito";
          }
         }
        
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
        filterFunction(cell?: any, search?: string,): boolean {          
          if(cell.namesubject==search)
          {
            
           return true;
         } else {
           console.log("cell:"+cell.namesubject)
           console.log("search:"+search)
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
        filterFunction(cell?: any, search?: string,): boolean {          
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
  Area: any=[];
  areas:any=[];
  subjects:any=[];
  usuarios:any=[];
  cursos:any=[];
  nombreasignaturas:any=[];
  constructor(private service: SmartTableData, private subjectsService:SubjectsService,private router:Router) { }

  ngOnInit(): void {
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
      console.log(this.subjects);
      },
      err =>console.error(err)
      );
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
    console.log(this.settings.columns['IDNameSubject.IDArea'].editor.config.list);
    console.log(this.settings.columns['IDNameSubject.IDArea'].filter.config.list);
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
