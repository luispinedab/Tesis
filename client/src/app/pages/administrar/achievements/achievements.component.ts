import { Component, OnInit } from '@angular/core';
import {AchievementsService} from '../../../services/achievements.service';
import {Router} from '@angular/router';
import {SmartTableData} from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {
  settings = {
    add:{
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
      IDLevelGrade:{
        title: 'Nivel del Curso',
        
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
          if(cell.IDLevelGrade==search)
          {
           return true;
         } else {
           return false;
         } 
       },
        valuePrepareFunction: (data) => {
        return data.levelgrade;
      },
      },
      IDSubject:{
        title: 'Materia',
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
          if(cell.IDSubject==cell[search])
          {
           return true;
         } else {
           return false;
         } 
       },
        valuePrepareFunction: (data) => {
        return data.IDSubject;
      },
      },
      Achievement:{
        title:'Logro',
        type:'string'
      }
    }
  }
  achievements:any=[];
  subjects:any=[];
  subjects1:any=[];
  levelgrades:any=[];
  constructor(private service: SmartTableData, private achievementsService:AchievementsService,private router:Router) { }

  ngOnInit(): void {
    this.getNivelCursos();
    this.getAsignaturas();
    this.getAchievements();
  }

  getAchievements(){
    this.achievementsService.getLogros().subscribe( 
      res=>{
      this.achievements = res;
      this.achievements.forEach(function(elemento, indice, array) {
          array[indice].IDSubject.IDSubject=array[indice].IDSubject.IDNameSubject.namesubject;
          //console.log(array[indice].IDSubject.IDSubject);
   })
      },
      err =>console.error(err)
      );
      //console.log(this.achievements);
  }
  getAsignaturas(){
    this.achievementsService.getAsignaturas().subscribe(
      res=>{
        this.subjects =res;
    for(let u of this.subjects){
      
      if(this.subjects1.includes(u.IDNameSubject.namesubject)==false)
      {
        this.settings.columns.IDSubject.editor.config.list.push({value:u.IDSubject,title:u.IDNameSubject.namesubject});
        this.settings.columns.IDSubject.filter.config.list.push({value:u.IDSubject,title:u.IDNameSubject.namesubject});
        this.settings = Object.assign({}, this.settings);
      }
      this.subjects1.push(u.IDNameSubject.namesubject);
      
      
      
    }
    }
    );
  }
  getNivelCursos(){
    this.achievementsService.getNivelCursos().subscribe(
      res=>{
        this.levelgrades =res;
    for(let u of this.levelgrades){
      this.settings.columns.IDLevelGrade.editor.config.list.push({value:u.IDLevelGrade,title:u.levelgrade});
      this.settings.columns.IDLevelGrade.filter.config.list.push({value:u.IDLevelGrade,title:u.levelgrade});
      this.settings = Object.assign({}, this.settings);
      
    }  
    }
    );
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      let index = this.achievements.indexOf(event.data);
      var selectedrow= this.achievements[index];
      this.achievementsService.deleteLogros(selectedrow.IDAchievement)
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
       console.log("nuevo"+newregistry);
      this.achievementsService.saveLogros(newregistry)
    .subscribe(
      res => {
        this.getAchievements();
        console.log(res);
      },
      err => console.error(err)
    )
    } else {
      event.confirm.reject();
    }
  } 
  onSaveConfirm(event):void {
    if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve(event.newData);
      var newrow=event.newData;
      this.achievementsService.updateLogros(newrow.IDAchievement,newrow)
    .subscribe(
      res =>{
        this.getAchievements();
        console.log(res);
      },
      err => console.error(err)
    )
    } else {
      event.confirm.reject();
    }
  }
}
