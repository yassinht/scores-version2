import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFoldersComponent } from './list-folders/list-folders.component';

const routes: Routes = [
  {path:'',component:ListFoldersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListFoldersRoutingModule { }
