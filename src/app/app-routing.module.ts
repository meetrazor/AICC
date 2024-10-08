import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'AICC',
    pathMatch: 'full',
  },
  {
    path: 'property',
    redirectTo: 'AICC/property',
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'AICC',
    component: LayoutComponent,
    loadChildren: () =>
      import('./treasurer/treasurer.module').then((m) => m.TreasurerModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'property',
    component: LayoutComponent,
    loadChildren: () =>
      import('./property/property.module').then((m) => m.PropertyModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tax',
    component: LayoutComponent,
    loadChildren: () => import('./tax/tax.module').then((m) => m.TaxModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'rent',
    component: LayoutComponent,
    loadChildren: () => import('./rent/rent.module').then((m) => m.RentModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'trust',
    component: LayoutComponent,
    loadChildren: () =>
      import('./trust/trust.module').then((m) => m.TrustModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: LayoutComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'property-document', component: LayoutComponent, loadChildren: () => import('./property-document/property-document.module')
  //     .then(m => m.PropertyDocumentModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'property-legal-case', component: LayoutComponent, loadChildren: () => import('./legal-case/legal-case.module')
  //     .then(m => m.LegalCaseModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'tenant', component: LayoutComponent, loadChildren: () => import('./tenant/tenant.module')
  //     .then(m => m.TenantModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'photograph', component: LayoutComponent, loadChildren: () => import('./photograph/photograph.module')
  //     .then(m => m.PhotographModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'test', component: LayoutComponent, loadChildren: () => import('./pages/pages.module')
  //     .then(m => m.PagesModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'tax', component: LayoutComponent, loadChildren: () => import('./tax/tax.module')
  //     .then(m => m.TaxModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'lawyer', component: LayoutComponent, loadChildren: () => import('./lawyer/lawyer.module')
  //     .then(m => m.LawyerModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'rent', component: LayoutComponent, loadChildren: () => import('./rent/rent.module')
  //     .then(m => m.RentModule), canActivate: [AuthGuard]
  // },
  {
    path: '**',
    component: LayoutComponent,
    loadChildren: () =>
      import('./comming-soon/comming-soon.module').then(
        (m) => m.CommingSoonModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
