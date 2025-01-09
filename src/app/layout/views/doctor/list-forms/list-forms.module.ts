import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListFormsRoutingModule } from './list-forms-routing.module';
import { ListFormsComponent } from './list-forms/list-forms.component';

import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { MultiSelectModule } from "primeng/multiselect";
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { PatientListAffectModule } from '../patient-list-affect/patient-list-affect.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListFormsComponent
  ],
  imports: [
    CommonModule,
    ListFormsRoutingModule,
    TableModule,
    ButtonModule,FormsModule,
    TabViewModule,TranslateModule,
    TooltipModule,
    InputTextModule,
    CheckboxModule,MultiSelectModule,DialogModule,
    PanelModule,DropdownModule,DataViewModule,OverlayPanelModule,
    PickListModule,OrderListModule,PatientListAffectModule  // Import this here if used in templates of ListFormsComponent

  ]
})
export class ListFormsModule { }
