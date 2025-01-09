import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientsComponent } from './list-patients/list-patients.component';

const routes: Routes = [
  {path:'',component:ListPatientsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPatientsRoutingModule { }
