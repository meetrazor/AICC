import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLawyerComponent } from './add-lawyer/add-lawyer.component';
import { ViewLawyerComponent } from './view-lawyer/view-lawyer.component';
const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: AddLawyerComponent },
  { path: 'view/:id', component: ViewLawyerComponent },
  { path: 'edit/:id', component: AddLawyerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerRoutingModule { }
