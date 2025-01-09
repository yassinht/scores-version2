import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPreviewRoutingModule } from './form-preview-routing.module';
import { FormPreviewComponent } from './form-preview/form-preview.component';
// PrimeNG Modules
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    FormPreviewComponent
  ],
  imports: [
    CommonModule,
    FormPreviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    RadioButtonModule,
    SliderModule,
    TableModule,
    PaginatorModule,
    ProgressSpinnerModule,
    ToastModule,
    RippleModule,
    DialogModule,
    OverlayPanelModule,
    AvatarModule,NgxSliderModule
  ]
})
export class FormPreviewModule { }
