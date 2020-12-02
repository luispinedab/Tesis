import { Component, OnInit } from '@angular/core';
import {GradesService} from '../../../services/grades.service';
import {UsersService} from '../../../services/users.service';
import {Router} from '@angular/router';

import { SmartTableData } from '../../../@core/data/smart-table';


@Component({
  selector: 'ngx-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent{
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Year: {
        title: 'Año',
        type: 'date',
      },
      LevelGrade: {
        title: 'Nivel',
        type: 'string',
      },
      NameGrade: {
        title: 'Nombre del curso',
        type: 'string',
      },
      IDDirector: {
        title: 'Director de Curso',
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
        return data.Name + data.Lastname;
      },
    },
    },
  };
  grades: any = [];
  usuarios: any = [];
  temp: any = [];
  constructor(private service: SmartTableData, private gradesService:GradesService,private usersService:UsersService, private router:Router) {
  }

  ngOnInit(): void {
    var cont = 0;
    this.getGrades();
    this.getUsers(cont);
  }
  getGrades(){
    this.gradesService.getCursos().subscribe(
      res=>{
        this.grades = res; 
      },
      err =>console.error(err)
    );
  }
  getUsers(cont){
    this.usersService.getUsuarios().subscribe(
      res=>{
        this.usuarios =res;
    for(let u of this.usuarios){
      if(u.IDUserType.IDUserType==1){
      this.settings.columns.IDDirector.editor.config.list.push({value:u.IDUser,title:u.Name+u.Lastname});
      this.settings.columns.IDDirector.filter.config.list.push({value:u.IDUser,title:u.Name+u.Lastname});
      this.settings = Object.assign({}, this.settings);
      }
    }
    }
    );
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
