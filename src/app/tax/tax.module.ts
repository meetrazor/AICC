import { TaxRoutingModule } from './tax-routing.module';
import { UIModule } from './../shared/ui/ui.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PhotographModule } from './../photograph/photograph.module';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddTaxComponent } from './add-tax/add-tax.component';
import { ViewTaxComponent } from './view-tax/view-tax.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { UploadReceiptComponent } from './upload-receipt/upload-receipt.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AddTaxComponent, ViewTaxComponent, UploadReceiptComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, SharedModule, UIModule, NgSelectModule,
    FileUploadModule, DataTablesModule, TaxRoutingModule
  ], providers: [DatePipe],
  exports: [AddTaxComponent, ViewTaxComponent]
})
export class TaxModule { }
