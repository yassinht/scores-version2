import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPatientsRoutingModule } from './list-patients-routing.module';
import { ListPatientsComponent } from './list-patients/list-patients.component';
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



@NgModule({
  declarations: [
    ListPatientsComponent
  ],
  imports: [
    CommonModule,
    ListPatientsRoutingModule,
    FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,ConfirmDialogModule,SidebarModule,ConfirmPopupModule,
		ProgressBarModule,OverlayPanelModule,TooltipModule,
		ToastModule,DialogModule
  ]
})
export class ListPatientsModule { }
