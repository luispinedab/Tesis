import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
nombrepersona:any;
  constructor() { }

  ngOnInit(): void {
   this.getinfo();
  }
getinfo(){
  var token = localStorage.getItem('usuario');
  var tokenbyload:any = decode(token);
  console.log(tokenbyload);
  this.nombrepersona = tokenbyload.nombre;
}
}
