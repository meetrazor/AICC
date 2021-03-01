import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { PortletsComponent } from './portlets/portlets.component';
import { TabsComponent } from './tabs/tabs.component';
import { ModalsComponent } from './modals/modals.component';
import { ProgressComponent } from './progress/progress.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RibbonsComponent } from './ribbons/ribbons.component';
import { GridComponent } from './grid/grid.component';
import { TypographyComponent } from './typography/typography.component';
import { GeneraluiComponent } from './generalui/generalui.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ImagesComponent } from './images/images.component';
import { VideoComponent } from './video/video.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { TooltipComponent } from './tooltip/tooltip.component';

const routes: Routes = [
    {
        path: 'buttons',
        component: ButtonsComponent
    },
    {
        path: 'cards',
        component: CardsComponent
    },
    {
        path: 'portlets',
        component: PortletsComponent
    },
    {
        path: 'tabs-accordions',
        component: TabsComponent
    },
    {
        path: 'modals',
        component: ModalsComponent
    },
    {
        path: 'progress',
        component: ProgressComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'ribbons',
        component: RibbonsComponent
    },
    {
        path: 'spinners',
        component: SpinnersComponent
    },
    {
        path: 'ui-general',
        component: GeneraluiComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'grid',
        component: GridComponent
    },
    {
        path: 'carousel',
        component: CarouselComponent
    },
    {
        path: 'images',
        component: ImagesComponent
    },
    {
        path: 'video',
        component: VideoComponent
    },
    {
        path: 'dropdowns',
        component: DropdownsComponent
    },
    {
        path: 'tooltips-popovers',
        component: TooltipComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UiRoutingModule { }
