import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BilanViewRoutingModule } from './bilan-view-routing.module';
import { BilanComponent } from './bilan/bilan.component';

// PrimeNG modules
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    BilanComponent
  ],
  imports: [
    CommonModule,
    BilanViewRoutingModule,ButtonModule,AccordionModule,CardModule
  ]
})
export class BilanViewModule { }
