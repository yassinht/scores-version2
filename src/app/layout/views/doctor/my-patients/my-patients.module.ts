import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPatientsRoutingModule } from './my-patients-routing.module';
import { MyPatientsComponent } from './my-patients/my-patients.component';
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
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';



@NgModule({
  declarations: [
    MyPatientsComponent
  ],
  imports: [
    CommonModule,
    MyPatientsRoutingModule,
    FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,PanelModule,
		RippleModule,ReactiveFormsModule,AccordionModule,
		MultiSelectModule,TranslateModule,
		DropdownModule,ConfirmDialogModule,SidebarModule,ConfirmPopupModule,
		ProgressBarModule,OverlayPanelModule,TooltipModule,
		ToastModule,DialogModule,TabViewModule
  ]
})
export class MyPatientsModule { }
