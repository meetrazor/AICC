import { SingleTrustViewComponent } from './single-trust-view/single-trust-view.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'view/:trustID', component: SingleTrustViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrustRoutingModule { }
