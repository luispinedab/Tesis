import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {User} from '../../models/Usuario';
import {Router,ActivatedRoute} from '@angular/router';
import {UsuariosService} from '../../services/usuarios.service';
@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})


export class UsuarioFormComponent implements OnInit {
 user: User={
   Name:'',
   Lastname:'',
   Identification:0,
   Email:'',
   PhoneNumber:'',
   Nickname:'',
   Password:'1234',
   UserState:1,
   IDUserType:0
 };
  // ICONS
  constructor(library: FaIconLibrary,private usuariosService:UsuariosService, private router:Router,private activatedRoute:ActivatedRoute) {
    library.addIconPacks(fas);
  }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.usuariosService.getUsuario(params.id)
      .subscribe(
        res => {
          console.log(res);
          this.user=res;
        },
        err => console.error(err)
      )
    }
  }
  saveNewUser(){
    console.log(this.user);
    this.usuariosService.saveUsuario(this.user)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/']);
        this.router.navigate(['/usuarios']);
      },
      err => console.error(err)
    )
  }
  updateUser()
  {
    this.usuariosService.updateUsuario(this.user.IDUser,this.user)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/']);
        this.router.navigate(['/usuarios']);
      },
      err => console.error(err)
    )
  }
  deleteUser()
  {
    this.usuariosService.deleteUsuario(this.user.IDUser)
    .subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/']);
        this.router.navigate(['/usuarios']);
      },
      err=>console.error(err)
    )
  }
}
