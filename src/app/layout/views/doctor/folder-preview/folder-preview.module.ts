import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FolderPreviewRoutingModule } from './folder-preview-routing.module';
import { FodlerPreviewComponent } from './fodler-preview/fodler-preview.component';
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
import { ConfirmPopupModule } from 'primeng/confirmpopup';import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { TranslateModule } from '@ngx-translate/core';
import { PatientListAffectModule } from '../patient-list-affect/patient-list-affect.module';

@NgModule({
  declarations: [
    FodlerPreviewComponent
  ],
  imports: [
    CommonModule,
    FolderPreviewRoutingModule,
    FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,PanelModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,TranslateModule,
		DropdownModule,ConfirmDialogModule,SidebarModule,ConfirmPopupModule,
		ProgressBarModule,OverlayPanelModule,TooltipModule,
		ToastModule,DialogModule,CheckboxModule,BreadcrumbModule,PatientListAffectModule
  ]
})
export class FolderPreviewModule { }
