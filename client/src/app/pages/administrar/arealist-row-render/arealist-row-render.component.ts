import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SmartTableData} from '../../../@core/data/smart-table';
import {SubjectsService} from '../../../services/subjects.service';
@Component({
  selector: 'ngx-arealist-row-render',
  templateUrl: './arealist-row-render.component.html',
  styleUrls: ['./arealist-row-render.component.scss']
})
export class ArealistRowRenderComponent implements OnInit {
  settings = {
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
      },
      Profesor: {
        title: 'Profesor',
        type: 'string',
      },
      Curso: {
        title: 'Curso',
        type: 'string',
      },
      Area: {
        title: 'Area',
        type: 'string',
      },
      Asignatura: {
        title: 'Nombre de la asignatura',
        type: 'string',
      },
    },
  };
viewasignaturas: any=[];

  constructor(private service: SmartTableData, private subjectsservice:SubjectsService, private router:Router) { }

  ngOnInit() {
    this.getViewAsignaturas();
  }
  getViewAsignaturas(){
   this.subjectsservice.getAsignaturas().subscribe(
     res =>{
       this.viewasignaturas = res;
       console.log(this.viewasignaturas);
     },
     err =>console.error(err)
   );
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
    
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event):void { 
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
       var newregistry = event.newData;
       console.log(newregistry);
      this.subjectsservice.saveAsignaturas(newregistry)
    .subscribe(
      res => {
        this.getViewAsignaturas();
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
      
    } else {
      event.confirm.reject();
    }
  }
}

