import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseListRoutingModule } from './response-list-routing.module';
import { ResponseListComponent } from './response-list/response-list.component';

// PrimeNG modules
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    ResponseListComponent
  ],
  imports: [
    CommonModule,CardModule,AccordionModule,ButtonModule,
    ResponseListRoutingModule
  ]
})
export class ResponseListModule { }
