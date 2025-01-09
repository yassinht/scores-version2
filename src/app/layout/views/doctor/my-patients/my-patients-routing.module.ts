import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPatientsComponent } from './my-patients/my-patients.component';

const routes: Routes = [
  {path:'',component:MyPatientsComponent}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPatientsRoutingModule { }
