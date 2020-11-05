import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})

export class UsuarioListComponent implements OnInit {
  usuarios: any = [];
  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(){
    this.usuariosService.getUsuarios().subscribe(
      res=>{
        this.usuarios = res;
        console.log(this.usuarios);
      },
      err =>console.error(err)
    );
  }

}
