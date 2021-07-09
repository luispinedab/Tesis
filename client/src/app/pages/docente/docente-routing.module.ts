import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocenteGuard } from 'app/shared/docente.guard';
import { DocyestGuard } from 'app/shared/docyest.guard';
import { AsignarlogrosComponent } from './asignarlogros/asignarlogros.component';
import {DocenteComponent} from './docente.component';
import { FallasComponent } from './fallas/fallas.component';
import { NotasComponent } from './notas/notas.component';
import { TablafallasComponent } from './tablafallas/tablafallas.component';
import { VerComponent } from './tablafallas/ver/ver.component';
import { TablalogrosComponent } from './tablalogros/tablalogros.component';
import { TablanotasComponent } from './tablanotas/tablanotas.component';




const routes: Routes = [{
  path: '',
  component: DocenteComponent,
  children: [
    {
      path: 'Asignarlogros',
      component: AsignarlogrosComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Asignarlogros/tabla',
      component: TablalogrosComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Notas',
      component: NotasComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Notas/tabla',
      component: TablanotasComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Fallas',
      component: FallasComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Fallas/tabla',
      component: TablafallasComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Fallas/tabla-ver',
      component: VerComponent,
      canActivate:[DocyestGuard]
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteRoutingModule { }

export const routedComponents = [
  AsignarlogrosComponent,
  TablalogrosComponent,
  NotasComponent,
  TablanotasComponent,
  FallasComponent,
  TablafallasComponent,
  VerComponent
];