import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarComponent  } from './administrar.component';
import { TestComponent } from './test/test.component';
import {GradesComponent } from './grades/grades.component';


const routes: Routes = [{
  path: '',
  component: AdministrarComponent,
  children: [
    {
      path: 'administrar-usuarios',
      component: TestComponent,
    },
    {
      path: 'administrar-cursos',
      component: GradesComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarRoutingModule { }

export const routedComponents = [
  AdministrarComponent,
  TestComponent,
  GradesComponent
];