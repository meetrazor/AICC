import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from './../shared/shared.module';
import { UIModule } from './../shared/ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRentComponent } from './add-rent/add-rent.component';
import { ViewRentComponent } from './view-rent/view-rent.component';
import { RentRoutingModule } from './rent-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { UploadReceiptComponent } from './upload-receipt/upload-receipt.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AddRentComponent, ViewRentComponent, UploadReceiptComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, NgbDatepickerModule,
    FormsModule, SharedModule, FileUploadModule,
    AutocompleteLibModule, UIModule, RentRoutingModule, NgSelectModule
  ],
  exports: [AddRentComponent]
})
export class RentModule { }
