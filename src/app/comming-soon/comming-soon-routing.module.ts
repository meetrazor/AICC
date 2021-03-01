import { CommingSoonComponent } from './comming-soon.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '**', redirectTo: '/commingsoon', pathMatch: 'full' },
  { path: '', component: CommingSoonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommingSoonRoutingModule { }
