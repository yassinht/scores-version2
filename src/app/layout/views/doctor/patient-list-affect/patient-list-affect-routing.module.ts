import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListAffectComponent } from './patient-list-affect/patient-list-affect.component';

const routes: Routes = [
  {path:'',component:PatientListAffectComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientListAffectRoutingModule { }
