import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellersComponent } from './sellers/sellers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { EcommercedashboardComponent } from './ecommercedashboard/ecommercedashboard.component';

const routes: Routes = [
    {
        path: 'sellers',
        component: SellersComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'product-detail',
        component: ProductdetailComponent
    },
    {
        path: 'product-edit',
        component: ProducteditComponent
    },
    {
        path: 'ecommerce-dashboard',
        component: EcommercedashboardComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
