import { Component } from '@angular/core';
import {GradesService} from '../../../services/grades.service';
import {Router} from '@angular/router';


import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

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
        type: 'string',
        valuePrepareFunction: (data) => {
        return data.Name;
      },
    },
    },
  };

  grades: any = [];
  constructor(private service: SmartTableData, private gradesService:GradesService, private router:Router) {
  }
  ngOnInit(): void {
    this.getGrades();
  }
  getGrades(){
    this.gradesService.getCursos().subscribe(
      res=>{
        this.grades = res;
        console.log(res);    
      },
      err =>console.error(err)
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




