import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApexComponent } from './apex/apex.component';
import { ChartistComponent } from './chartist/chartist.component';
import { ChartjsComponent } from './chartjs/chartjs.component';

const routes: Routes = [
    {
        path: 'apex',
        component: ApexComponent
    },
    {
        path: 'chartist',
        component: ChartistComponent
    },
    {
        path: 'chartjs',
        component: ChartjsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartRoutingModule { }
