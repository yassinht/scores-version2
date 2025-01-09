import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsComponent } from './terms.component';





@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: TermsComponent }
  ])],
  exports: [RouterModule]
})
export class TermsRoutingModule { }
