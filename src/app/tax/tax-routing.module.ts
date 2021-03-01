import { UploadReceiptComponent } from './upload-receipt/upload-receipt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaxComponent } from '../tax/add-tax/add-tax.component';
const routes: Routes = [
  { path: '', redirectTo: '/tax', pathMatch: 'full' },
  { path: 'tax', component: AddTaxComponent },
  { path: 'uploadreceipt/:propertyid/:id', component: UploadReceiptComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule { }
