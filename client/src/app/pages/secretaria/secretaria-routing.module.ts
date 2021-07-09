import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecretariaComponent  } from './secretaria.component';
import { HorarioComponent } from './horario/horario.component';
import {ReportesComponent} from './reportes/reportes.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {SuccesusuarioComponent} from './succesusuario/succesusuario.component';
import { AsignarcursosComponent } from './asignarcursos/asignarcursos.component';
import { MenucursosComponent } from './menucursos/menucursos.component';
import { RegistrarnotaComponent } from './registrarnota/registrarnota.component';
import { MenunotasComponent } from './menunotas/menunotas.component';


const routes: Routes = [{
  path: '',
  component: SecretariaComponent,
  children: [
    {
      path: 'admision-horario',
      component: HorarioComponent
    },
    {
      path: 'descargarinfo',
      component: ReportesComponent
    },
    {
      path: 'crearusuario',
      component: UsuarioComponent
    },
    {
      path: 'succes',
      component: SuccesusuarioComponent
    },
    {
      path: 'asignarcursos',
      component: MenucursosComponent
    },
    {
      path: 'asignarcursos/tabla',
      component: AsignarcursosComponent
    },
    {
      path: 'registrarnota',
      component: MenunotasComponent
    },
    {
      path: 'registrarnota/tabla',
      component: RegistrarnotaComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretariaRoutingModule { }

export const routedComponents = [
  SecretariaComponent,
  HorarioComponent,
  ReportesComponent,
  UsuarioComponent,
  AsignarcursosComponent,
  RegistrarnotaComponent
];