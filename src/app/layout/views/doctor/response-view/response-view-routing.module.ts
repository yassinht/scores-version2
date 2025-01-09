import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponseViewComponent } from './response-view/response-view.component';

const routes: Routes = [
  {path:'',component:ResponseViewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponseViewRoutingModule { }
