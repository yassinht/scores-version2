import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FodlerPreviewComponent } from './fodler-preview/fodler-preview.component';

const routes: Routes = [
  {path:'',component:FodlerPreviewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FolderPreviewRoutingModule { }
