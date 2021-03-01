import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';
import { NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { CRMRoutingModule } from './crm-routing.module';

import { ContactsComponent } from './contacts/contacts.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { LeadsComponent } from './leads/leads.component';
import { CustomersComponent } from './customers/customers.component';
import { CrmdashboardComponent } from './crmdashboard/crmdashboard.component';
@NgModule({
  declarations: [ContactsComponent, OpportunitiesComponent, LeadsComponent, CustomersComponent, CrmdashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    NgbModalModule,
    NgbPaginationModule,
    NgApexchartsModule,
    NgbTypeaheadModule,
    CRMRoutingModule,
    Ng2SearchPipeModule
  ]
})
export class CRMModule { }
