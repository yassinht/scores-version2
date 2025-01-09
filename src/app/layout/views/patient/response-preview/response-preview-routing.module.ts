import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsePreviewComponent } from './response-preview/response-preview.component';

const routes: Routes = [
  {path:'',component:ResponsePreviewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsePreviewRoutingModule { }
