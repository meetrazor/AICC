import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng5SliderModule } from 'ng5-slider';
import { NgbCarouselModule, NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UIModule } from '../../shared/ui/ui.module';

import { AdminUIRoutingModule } from './adminUI-routing.module';

import { SweetalertComponent } from './sweetalert/sweetalert.component';
import { RangesliderComponent } from './rangeslider/rangeslider.component';
import { AnimationComponent } from './animation/animation.component';
import { WidgetsComponent } from './widgets/widgets.component';

@NgModule({
  declarations: [SweetalertComponent, RangesliderComponent, AnimationComponent, WidgetsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    NgbCarouselModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgApexchartsModule,
    UIModule,
    AdminUIRoutingModule
  ]
})
export class AdminUIModule { }
