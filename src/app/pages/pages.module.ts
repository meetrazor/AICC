import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardsModule } from './dashboards/dashboards.module';
import { AppsModule } from './apps/apps.module';
import { EmailModule } from './email/email.module';
import { ExtrasModule } from './extras/extras.module';
import { UiModule } from './ui/ui.module';
import { IconsModule } from './icons/icons.module';
import { FormModule } from './form/form.module';
import { ChartModule } from './chart/chart.module';
import { MapsModule } from './maps/maps.module';
import { TablesModule } from './tables/tables.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { CRMModule } from './crm/crm.module';
import { AdminUIModule } from './adminUI/adminUI.module';
import { ErrorModule } from './error/error.module';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbDropdownModule,
    DashboardsModule,
    AppsModule,
    EmailModule,
    ExtrasModule,
    UiModule,
    IconsModule,
    FormModule,
    ChartModule,
    MapsModule,
    TablesModule,
    EcommerceModule,
    CRMModule,
    AdminUIModule,
    ErrorModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
