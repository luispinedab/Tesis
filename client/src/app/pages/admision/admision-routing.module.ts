import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmisionComponent  } from './admision.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes:Routes = [{
    path: '',
    component: AdmisionComponent,
    children: [
        {
            path: 'admision-formulario',
            component: FormularioComponent,
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdmisionRoutingModule{}
  export const routedComponents =[
      AdmisionComponent,
      FormularioComponent
  ];