import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponseDetailsComponent } from './response-details/response-details.component';

const routes: Routes = [

  {path:'',component:ResponseDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponseDetailsRoutingModule { }
