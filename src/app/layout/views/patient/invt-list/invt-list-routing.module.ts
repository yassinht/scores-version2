import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvtListComponent } from './invt-list/invt-list.component';

const routes: Routes = [
  {path:'',component:InvtListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvtListRoutingModule { }
