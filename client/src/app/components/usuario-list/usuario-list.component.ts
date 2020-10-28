import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  usuarios: any = [];
  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(
      res=>{
        this.usuarios =res;
      },
      err =>console.error(err)
    );
  }

}
