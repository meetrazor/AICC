import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PricingComponent } from './pricing/pricing.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { FaqsComponent } from './faqs/faqs.component';

const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'timeline',
        component: TimelineComponent
    },
    {
        path: 'invoice',
        component: InvoiceComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
    },
    {
        path: 'gallery',
        component: GalleryComponent
    },
    {
        path: 'sitemap',
        component: SitemapComponent
    },
    {
        path: 'faqs',
        component: FaqsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExtrasRoutingModule {}
