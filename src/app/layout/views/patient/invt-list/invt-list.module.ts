import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvtListRoutingModule } from './invt-list-routing.module';
import { InvtListComponent } from './invt-list/invt-list.component';
// PrimeNG Modules
import { TableModule } from 'primeng/table'; // Data table
import { ButtonModule } from 'primeng/button'; // Buttons
import { InputTextModule } from 'primeng/inputtext'; // Input for search
import { DropdownModule } from 'primeng/dropdown'; // Dropdown for filtering
import { MultiSelectModule } from 'primeng/multiselect'; // Multi-select filter
import { SliderModule } from 'primeng/slider'; // Slider for numeric filters
import { ProgressBarModule } from 'primeng/progressbar'; // Progress bar
import { ToastModule } from 'primeng/toast'; // For notifications (if needed)
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    InvtListComponent
  ],
  imports: [
    CommonModule,
    InvtListRoutingModule, TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    ToastModule,TranslateModule
  ]
})
export class InvtListModule { }
