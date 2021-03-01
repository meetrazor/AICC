import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultDashboardComponent } from './default/default.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { Dashboard4Component } from './dashboard4/dashboard4.component';

const routes: Routes = [
    {
        path: 'dashboard-1',
        component: DefaultDashboardComponent
    },
    {
        path: 'dashboard-2',
        component: Dashboard2Component
    },
    {
        path: 'dashboard-3',
        component: Dashboard3Component
    },
    {
        path: 'dashboard-4',
        component: Dashboard4Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
