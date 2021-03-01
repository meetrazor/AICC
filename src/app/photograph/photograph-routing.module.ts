import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPhotographComponent } from './view-photograph/view-photograph.component';

const routes: Routes = [
  // { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path : '', component : ViewPhotographComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotographRoutingModule { }
