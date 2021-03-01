import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTenantComponent } from './add-tenant/add-tenant.component';

const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path : 'create', component : AddTenantComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
