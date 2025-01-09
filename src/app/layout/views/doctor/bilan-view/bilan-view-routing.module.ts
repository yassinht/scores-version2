import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BilanComponent } from './bilan/bilan.component';

const routes: Routes = [
  {path:'',component:BilanComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BilanViewRoutingModule { }
