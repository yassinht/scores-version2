import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientListAffectRoutingModule } from './patient-list-affect-routing.module';
import { PatientListAffectComponent } from './patient-list-affect/patient-list-affect.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PatientListAffectComponent
  ],
  imports: [
    CommonModule,
    PatientListAffectRoutingModule, FormsModule,
		TableModule,
		RatingModule,TranslateModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,ConfirmDialogModule,SidebarModule,ConfirmPopupModule,
		ProgressBarModule,OverlayPanelModule,TooltipModule,
		ToastModule,DialogModule,ReactiveFormsModule
  ],
  exports: [PatientListAffectComponent]  // Export the component to make it accessible in other modules

})
export class PatientListAffectModule { }
