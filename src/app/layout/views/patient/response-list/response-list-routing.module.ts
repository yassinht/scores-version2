import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponseListComponent } from './response-list/response-list.component';

const routes: Routes = [
  {path:'',component:ResponseListComponent}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponseListRoutingModule { }
