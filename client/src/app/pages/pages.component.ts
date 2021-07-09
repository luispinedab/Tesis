import { Component,OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import decode from 'jwt-decode';



@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{
  
  ngOnInit(){
    var Token = localStorage.getItem('usuario');
var tokenbyload:any = decode(Token);
var tipousuario = tokenbyload.tipo;
    MENU_ITEMS[1].hidden=tipousuario!='Admin'?true:false;
    MENU_ITEMS[2].hidden=tipousuario!='Aspirante'?true:false;
    MENU_ITEMS[3].hidden=tipousuario!='Secretaria'?true:false;
    MENU_ITEMS[4].hidden=tipousuario!='Secretaria'?true:false;
    MENU_ITEMS[5].hidden=tipousuario!='Comite'?true:false;
    MENU_ITEMS[6].hidden=tipousuario!='Docente'?true:false;
    MENU_ITEMS[7].hidden=tipousuario!='Docente'?true:false;
    MENU_ITEMS[8].hidden=tipousuario!='Aspirante'?true:false;
    this.menu = MENU_ITEMS;
  }
  menu;
}
