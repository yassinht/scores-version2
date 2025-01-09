import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichPatientRoutingModule } from './fich-patient-routing.module';
import { FichPatientComponent } from './fich-patient/fich-patient.component';
// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FichPatientComponent
  ],
  imports: [
    CommonModule,
    FichPatientRoutingModule ,CardModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,PanelModule,TranslateModule,
    InputNumberModule,RadioButtonModule,TabViewModule,DialogModule,
    ButtonModule,CalendarModule,ReactiveFormsModule,FormsModule,ToastModule
  ]
})
export class FichPatientModule { }
