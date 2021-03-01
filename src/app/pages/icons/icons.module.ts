import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '../../shared/ui/ui.module';

import { IconsRoutingModule } from './icons-routing.module';

import { SimplelineComponent } from './simpleline/simpleline.component';
import { FeatherComponent } from './feather/feather.component';
import { MaterialComponent } from './material/material.component';
import { FontawesomeComponent } from './fontawesome/fontawesome.component';
import { ThemifyComponent } from './themify/themify.component';
import { WeatherComponent } from './weather/weather.component';
import { DripiconsComponent } from './dripicons/dripicons.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [SimplelineComponent, FeatherComponent, MaterialComponent, FontawesomeComponent, ThemifyComponent, WeatherComponent, DripiconsComponent],
  imports: [
    CommonModule,
    UIModule,
    IconsRoutingModule
  ]
})
export class IconsModule { }
