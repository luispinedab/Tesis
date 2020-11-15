import { Component} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {Router} from '@angular/router';



import { SmartTableData } from '../../../@core/data/smart-table';


@Component({
  selector: 'ngx-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  template: `<router-outlet></router-outlet>`,
})
export class TestComponent{
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
        editor:
        {
          type: 'list',
          config:
          { 
            list: [{value:1,title:'Activo'},{value:0,title:'Inactivo'}]
          },  
        },
      },
      IDUserType: {
        title: 'TipoUsuario',
        type: 'list',
        editor:
        {
          type: 'list',
          config:
          { 
            list: []
          },  
        },
        valuePrepareFunction: (data) => {
        return data.UserType;
      },
    },
    },
  };
 tipousuarios: any=[];
usuarios: any = [];
  edit:boolean = false;
  constructor(private service: SmartTableData, private usuariosService:UsersService, private router:Router) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getUsertype();
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
  getUsertype(){
    this.usuariosService.getTipoUsuarios().subscribe(
      data => {
        this.tipousuarios =data;
        for(let tu of this.tipousuarios){
          this.settings.columns.IDUserType.editor.config.list.push({value:tu.IDUserType,title:tu.UserType});
          this.settings = Object.assign({}, this.settings);
        }
      }
    )
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      let index = this.usuarios.indexOf(event.data);
      var selectedrow= this.usuarios[index];
      this.usuariosService.deleteUsuario(selectedrow.IDUser)
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
       newregistry.Password= newregistry.Identification;
       console.log(newregistry);
      this.usuariosService.saveUsuario(newregistry)
    .subscribe(
      res => {
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
      this.usuariosService.updateUsuario(newrow.IDUser,newrow)
    .subscribe(
      res =>{
        console.log(res);
      },
      err => console.error(err)
    )
    } else {
      event.confirm.reject();
    }
  }
  
}

