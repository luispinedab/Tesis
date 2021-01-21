import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import {UserListComponent} from '../app/components/user-list/user-list.component';
import {NavigationComponent} from '../app/components/navigation/navigation.component';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AdmisionComponent } from './pages/admision/admision.component';
import { FormularioComponent } from './pages/admision/formulario/formulario.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: '',
    redirectTo: 'administrar',
    pathMatch: 'full'
  },
  {
    path: 'administrar',
    component:NavigationComponent,
  },
  {
    path: 'administrar/usuarios',
    component:UserListComponent,
  },
  {
    path: 'administrar/usuarios/crud/:id',
    component:UserListComponent, 
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      }
    ],
  },
  {
    path: 'admision',
    component: AdmisionComponent,
    children: [
      { path: 'formulario',
      component: FormularioComponent,
    }
    ],   
  },
];
const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
