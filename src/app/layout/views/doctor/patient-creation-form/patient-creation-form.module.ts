import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientCreationFormRoutingModule } from './patient-creation-form-routing.module';
import { PatientCreationFormComponent } from './patient-creation-form/patient-creation-form.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MessagesModule } from 'primeng/messages';
import { AutoCompleteModule } from "primeng/autocomplete";
import { ChipsModule } from "primeng/chips";
import { ChipModule } from "primeng/chip";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from 'primeng/rating';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [
    PatientCreationFormComponent
  ],
  imports: [
    CommonModule,SliderModule,InputTextareaModule,MultiSelectModule,RatingModule,KnobModule,ListboxModule,CascadeSelectModule,InputNumberModule,SelectButtonModule,InputMaskModule,DropdownModule,CheckboxModule,ToggleButtonModule,InputSwitchModule,FormsModule,InputTextModule,ButtonModule,MessagesModule,
    PatientCreationFormRoutingModule,AutoCompleteModule,RadioButtonModule,CalendarModule,ReactiveFormsModule
  ]
})
export class PatientCreationFormModule { }
