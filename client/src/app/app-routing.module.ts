import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UsuarioListComponent} from './components/usuario-list/usuario-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    component: UsuarioListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
