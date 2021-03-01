import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTenantComponent } from './add-tenant/add-tenant.component';
import { TenantRoutingModule } from './tenant-routing.module';

@NgModule({
  declarations: [AddTenantComponent],
  imports: [
    CommonModule,
    TenantRoutingModule
  ]
})
export class TenantModule { }
