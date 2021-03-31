import { AddExistingPropertyComponent } from './add-existing-property/add-existing-property.component';
import { TrustCreateComponent } from './trust-create/trust-create.component';
import { SingleTrustViewComponent } from './single-trust-view/single-trust-view.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'view-trust/:trustID', component: SingleTrustViewComponent },
  { path: 'create-trust', component: TrustCreateComponent },
  { path: 'addexiting/:trustID', component: AddExistingPropertyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrustRoutingModule { }
