import { DataTablesModule } from 'angular-datatables';
import { RentModule } from './../rent/rent.module';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TreasurerRoutingModule } from './treasurer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbDatepickerModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyComponent } from './property/property.component';
import { UIModule } from '../shared/ui/ui.module';
import { LawyerComponent } from './lawyer/lawyer.component';
import { RentComponent } from './rent/rent.component';
import { RentDetailsComponent } from './rent/rent-details/rent-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { AlertComponent } from './alert/alert.component';
import { AlertDataTableComponent } from './alert/alert-data-table/alert-data-table.component';
import { TrustListComponent } from './trust-list/trust-list.component';

@NgModule({
  declarations: [DashboardComponent, PropertyComponent, LawyerComponent, RentComponent, RentDetailsComponent, AlertComponent, AlertDataTableComponent, TrustListComponent],
  imports: [
    CommonModule,
    TreasurerRoutingModule, ReactiveFormsModule, NgSelectModule, FileUploadModule,
    NgbDatepickerModule, FormsModule, UIModule, NgbPaginationModule, DataTablesModule, SharedModule, DataTablesModule,
    NgbTypeaheadModule, RentModule, NgbModalModule
  ], exports: [RentComponent, LawyerComponent,AlertComponent], providers: [DatePipe]
})
export class TreasurerModule { }
