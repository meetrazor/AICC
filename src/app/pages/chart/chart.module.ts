import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxChartistModule } from 'ngx-chartist';
import { ChartsModule } from 'ng2-charts';

import { ChartRoutingModule } from './chart.routing.module';

import { UIModule } from '../../shared/ui/ui.module';

import { ApexComponent } from './apex/apex.component';
import { ChartistComponent } from './chartist/chartist.component';
import { ChartjsComponent } from './chartjs/chartjs.component';

@NgModule({
  declarations: [ApexComponent, ChartistComponent, ChartjsComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    UIModule,
    NgApexchartsModule,
    NgxChartistModule,
    ChartsModule
  ]
})
export class ChartModule { }
