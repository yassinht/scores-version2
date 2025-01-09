import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientCreationFormComponent } from './patient-creation-form/patient-creation-form.component';

const routes: Routes = [  {path:'',component:PatientCreationFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientCreationFormRoutingModule { }
