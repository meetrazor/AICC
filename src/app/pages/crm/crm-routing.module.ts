import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { LeadsComponent } from './leads/leads.component';
import { CustomersComponent } from './customers/customers.component';
import { CrmdashboardComponent } from './crmdashboard/crmdashboard.component';

const routes: Routes = [
    {
        path: 'dashboard',
    component: CrmdashboardComponent
    },
    {
        path: 'contacts',
        component: ContactsComponent
    },
    {
        path: 'opportunities',
        component: OpportunitiesComponent
    },
    {
        path: 'leads',
        component: LeadsComponent
    },
    {
        path: 'customers',
        component: CustomersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CRMRoutingModule {}
