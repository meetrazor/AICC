import { UIModule } from './../shared/ui/ui.module';
import { CommingSoonComponent } from './comming-soon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommingSoonRoutingModule } from './comming-soon-routing.module';

@NgModule({
  declarations: [CommingSoonComponent],
  imports: [
    CommonModule,
    CommingSoonRoutingModule, UIModule
  ]
})
export class CommingSoonModule { }
