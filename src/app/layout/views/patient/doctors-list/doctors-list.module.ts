import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsListRoutingModule } from './doctors-list-routing.module';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Import the ProgressSpinner module

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
    DoctorsListComponent
  ],
  imports: [
    CommonModule,
    DoctorsListRoutingModule,
    FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,AccordionModule,
		SliderModule,TranslateModule,
		InputTextModule,PanelModule,
		ToggleButtonModule,
		RippleModule,ProgressSpinnerModule,
		MultiSelectModule,
		DropdownModule,ConfirmDialogModule,SidebarModule,ConfirmPopupModule,
		ProgressBarModule,OverlayPanelModule,TooltipModule,
		ToastModule,DialogModule
  ]
})
export class DoctorsListModule { }
