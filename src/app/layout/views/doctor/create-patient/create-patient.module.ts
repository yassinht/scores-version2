import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePatientRoutingModule } from './create-patient-routing.module';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CreatePatientComponent
  ],
  imports: [
    CommonModule,ToastModule,DialogModule,TranslateModule,
    CreatePatientRoutingModule,FormsModule,InputTextModule,ButtonModule
  ]
})
export class CreatePatientModule { }
