import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule, NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbStepperModule
 } from '@nebular/theme';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AdmisionRoutingModule, routedComponents } from './admision-routing.module';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
    imports: [
        CommonModule,
        NbCardModule,
        NbIconModule,
        NbInputModule,
        NbStepperModule,
        ThemeModule,
        AdmisionRoutingModule,
        NbButtonModule,
        NbActionsModule,
        NbUserModule,
        NbCheckboxModule,
        NbRadioModule,
        NbDatepickerModule,
        NbSelectModule,
    ],
    declarations: [
        ...routedComponents,
        FormularioComponent,
    ],
})

export class AdmisionModule {}