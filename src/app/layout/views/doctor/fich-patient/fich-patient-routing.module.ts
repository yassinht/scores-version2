import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichPatientComponent } from './fich-patient/fich-patient.component';

const routes: Routes = [  {path:'',component:FichPatientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichPatientRoutingModule { }
