import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AdmisionRoutingModule, routedComponents } from './admision-routing.module';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
    imports: [
        CommonModule,
        NbCardModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        AdmisionRoutingModule,
    ],
    declarations: [
        ...routedComponents,
        FormularioComponent,
      ],
})

export class AdmisionModule {}