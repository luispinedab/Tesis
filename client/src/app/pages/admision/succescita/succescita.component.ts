import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import decode from 'jwt-decode';

@Component({
  selector: 'ngx-succescita',
  templateUrl: './succescita.component.html',
  styleUrls: ['./succescita.component.scss']
})
export class SuccescitaComponent implements OnInit {
  estudiante:any;
  Nota:any;
  data:any;
  dt:any;
  constructor(private router:Router,private infostudentservice:InfoestudianteService) {
    this.data = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
    var Token = localStorage.getItem('usuario');
    var tokenbyload:any = decode(Token);
    this.infostudentservice.getInfoEstudiantebyaspirante(tokenbyload.idAspirante).subscribe(res=>{
        this.estudiante=res;
        this.Nota=this.estudiante.Nota;
        console.log(this.estudiante)
    })
    this.data = history.state;
     this.dt = new Date(this.data.cita);
    console.log("día"+this.dt.getDate()+"/"+this.dt.getMonth()+"/"+this.dt.getFullYear()+" a las "+this.dt.getHours()+":"+this.dt.getMinutes());
  }

}
