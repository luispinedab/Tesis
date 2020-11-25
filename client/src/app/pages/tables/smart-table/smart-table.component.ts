import { Component } from '@angular/core';
import {UsersService} from '../../../services/users.service';
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
      Name: {
        title: 'Nombre',
        type: 'string',
      },
      Lastname: {
        title: 'Apellido',
        type: 'string',
      },
      Identification: {
        title: 'Identificación',
        type: 'number',
      },
      Email: {
        title: 'E-mail',
        type: 'string',
      },
      PhoneNumber: {
        title: 'Celular',
        type: 'number',
      },
      Nickname: {
        title: 'NombredeUsuario',
        type: 'string',
      },
      UserState: {
        title: 'Estado',
        type: 'number',
      },
      IDUserType: {
        title: 'TipodeUsuario',
        type: 'string',
        valuePrepareFunction: (data) => {
        return data.UserType;
      },
    },
    },
  };

  usuarios: any = [];
  edit:boolean = false;
  constructor(private service: SmartTableData, private usuariosService:UsersService, private router:Router) {
  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.usuariosService.getUsuarios().subscribe(
      res=>{
        this.usuarios = res;
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
