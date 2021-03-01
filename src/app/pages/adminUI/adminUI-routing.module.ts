import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SweetalertComponent } from './sweetalert/sweetalert.component';
import { RangesliderComponent } from './rangeslider/rangeslider.component';
import { AnimationComponent } from './animation/animation.component';
import { WidgetsComponent } from './widgets/widgets.component';

const routes: Routes = [{
        path: 'sweet-alert',
        component: SweetalertComponent
    },
    {
        path: 'range-slider',
        component: RangesliderComponent
    },
    {
        path: 'animation',
        component: AnimationComponent
    },
    {
        path: 'widgets',
        component: WidgetsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminUIRoutingModule { }
