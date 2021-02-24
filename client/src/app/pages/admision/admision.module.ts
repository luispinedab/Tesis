import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {NbPopoverModule,NbCardModule, NbIconModule, NbInputModule, NbStepperModule,NbSelectModule,NbDatepickerModule,NbButtonModule,NbActionsModule,NbUserModule,NbCheckboxModule,NbRadioModule,} from '@nebular/theme';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NbDateFnsDateModule} from '@nebular/date-fns';
import { ThemeModule } from '../../@theme/theme.module';
import { AdmisionRoutingModule, routedComponents } from './admision-routing.module';
import { FormularioComponent } from './formulario/formulario.component';
import {DialogNamePromptComponent} from './formulario/dialog-name-prompt/dialog-name-prompt.component';
import {FormExperienciasComponent} from './formulario/FormExperiencias/dialog-name-prompt.component';

@NgModule({
    imports: [
        CommonModule,
        NbCardModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        AdmisionRoutingModule,
        NbStepperModule,
        NbSelectModule,
        NbDatepickerModule,
        NbDateFnsDateModule,
        ThemeModule,
        NbButtonModule,
        NbActionsModule,
        NbUserModule,
        NbCheckboxModule,
        NbRadioModule,
        ReactiveFormsModule,
        FormsModule,
        NbPopoverModule
    ],
    declarations: [
        ...routedComponents,
        FormularioComponent,
        DialogNamePromptComponent,
        FormExperienciasComponent
      ],
})

export class AdmisionModule {}