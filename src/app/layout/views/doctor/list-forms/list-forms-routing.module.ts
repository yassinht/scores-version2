import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFormsComponent } from './list-forms/list-forms.component';

const routes: Routes = [
  {path:'',component:ListFormsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListFormsRoutingModule { }
