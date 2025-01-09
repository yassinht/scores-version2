import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientProfileRoutingModule } from './patient-profile-routing.module';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

import { TranslateModule } from '@ngx-translate/core';

import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PatientProfileComponent
  ],
  imports: [
    CommonModule,
    PatientProfileRoutingModule,
    CardModule,PanelModule,TabViewModule,
    InputTextModule,
    InputTextareaModule,CheckboxModule, 
    DropdownModule,ToastModule,TranslateModule,
    InputNumberModule,RadioButtonModule,DialogModule,
    ButtonModule,CalendarModule,ReactiveFormsModule,FormsModule
  ]
})
export class PatientProfileModule { }
