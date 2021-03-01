import { NgxEditorModule } from 'ngx-editor';
import { LawyersComponent } from './lawyers/lawyers.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from './../shared/ui/ui.module';
import { NgbAccordionModule, NgbDatepickerModule, NgbProgressbarModule, NgbModalModule, NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BankModuleRoutingModule } from './bank-module-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { PvrReportComponent } from './pvr-report/pvr-report.component';
import { GeneratePVRReportComponent } from './generate-pvr-report/generate-pvr-report.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { PublicNoticesComponent } from './public-notices/public-notices.component';
import { PublicNoticeComponent } from './public-notice/public-notice.component';
import { TitleClearListComponent } from './title-clear-list/title-clear-list.component';
import { TitleClearComponent } from './title-clear/title-clear.component';
import { PublicNoticeViewComponent } from './public-notice-view/public-notice-view.component';
import { TitleClearCompleteComponent } from './title-clear-complete/title-clear-complete.component';
import { ViewFilterDocumentsComponent } from './view-filter-documents/view-filter-documents.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';


@NgModule({
  declarations: [ApplicantDashboardComponent, ApplicationComponent,
    DashboardComponent, AddApplicationComponent, ViewDocumentComponent, LawyersComponent,
    UploadDocumentComponent, PvrReportComponent, GeneratePVRReportComponent,
    AssignmentsComponent, AssignmentComponent, PublicNoticesComponent, PublicNoticeComponent,
    TitleClearListComponent, TitleClearComponent, PublicNoticeViewComponent, TitleClearCompleteComponent, ViewFilterDocumentsComponent, BulkUploadComponent],
  imports: [
    CommonModule, LayoutsModule, UIModule, FormsModule, NgSelectModule, NgbProgressbarModule, NgApexchartsModule, NgbAccordionModule,
    BankModuleRoutingModule, NgbDatepickerModule, DataTablesModule, NgbModalModule, NgbAlertModule, NgbDropdownModule,
    ReactiveFormsModule, FormsModule, AutocompleteLibModule, FileUploadModule, PDFExportModule,
    PdfViewerModule, NgxEditorModule
  ], providers: [DatePipe]
})
export class BankModuleModule { }
