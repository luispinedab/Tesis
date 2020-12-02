import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AdministrarRoutingModule, routedComponents } from './administrar-routing.module';
import { GradesComponent } from './grades/grades.component';


@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    AdministrarRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    GradesComponent,
  ],
})
export class AdministrarModule { }
