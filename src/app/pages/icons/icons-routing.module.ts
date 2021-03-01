import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatherComponent } from './feather/feather.component';
import { MaterialComponent } from './material/material.component';
import { FontawesomeComponent } from './fontawesome/fontawesome.component';
import { ThemifyComponent } from './themify/themify.component';
import { WeatherComponent } from './weather/weather.component';
import { SimplelineComponent } from './simpleline/simpleline.component';
import { DripiconsComponent } from './dripicons/dripicons.component';

const routes: Routes = [
    {
        path: 'simpleline',
        component: SimplelineComponent
    },
    {
        path: 'feather',
        component: FeatherComponent
    },
    {
        path: 'material',
        component: MaterialComponent
    },
    {
        path: 'fontawesome',
        component: FontawesomeComponent
    },
    {
        path: 'themify',
        component: ThemifyComponent
    },
    {
        path: 'weather',
        component: WeatherComponent
    },
    {
        path: 'dripicons',
        component: DripiconsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IconsRoutingModule {}
