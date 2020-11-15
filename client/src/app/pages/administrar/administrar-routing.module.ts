import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarComponent  } from './administrar.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [{
  path: '',
  component: AdministrarComponent,
  children: [
    {
      path: 'administrar-usuarios',
      component: TestComponent,
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
];