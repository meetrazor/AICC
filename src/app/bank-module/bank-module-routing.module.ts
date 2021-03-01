import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { ViewFilterDocumentsComponent } from './view-filter-documents/view-filter-documents.component';
import { TitleClearCompleteComponent } from './title-clear-complete/title-clear-complete.component';
import { PublicNoticeViewComponent } from './public-notice-view/public-notice-view.component';
import { TitleClearComponent } from './title-clear/title-clear.component';
import { TitleClearListComponent } from './title-clear-list/title-clear-list.component';
import { PublicNoticeComponent } from './public-notice/public-notice.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { LawyersComponent } from './lawyers/lawyers.component';

import { GeneratePVRReportComponent } from './generate-pvr-report/generate-pvr-report.component';
import { PvrReportComponent } from './pvr-report/pvr-report.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { AddApplicationComponent } from './add-application/add-application.component';

import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { PublicNoticesComponent } from './public-notices/public-notices.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'applications',
    component: ApplicationComponent
  },
  {
    path: 'title-search/:id',
    component: ApplicantDashboardComponent
  }, {
    path: 'addapplication',
    component: AddApplicationComponent
  }, {
    path: 'viewdocument/:propertyid/:id',
    component: ViewDocumentComponent
  }, {
    path: 'viewdocument/:propertyid/:id/:AppID',
    component: ViewDocumentComponent
  }, {
    path: 'uploaddocument/:Appid',
    component: UploadDocumentComponent
  }, {
    path: 'PVRreport/:Appid',
    component: PvrReportComponent
  }, {
    path: 'GeneratePVR/:AppID',
    component: GeneratePVRReportComponent
  }, {
    path: 'Lawyers/:AppID',
    component: LawyersComponent
  }
  , {
    path: 'assignment',
    component: AssignmentsComponent
  }, {
    path: 'assignment/:AppID',
    component: AssignmentComponent
  }, {
    path: 'publicnotice/:AppID',
    component: PublicNoticeComponent
  }, {
    path: 'publicnotices',
    component: PublicNoticesComponent
  }, {
    path: 'titleclear',
    component: TitleClearListComponent
  }, {
    path: 'titleclear/:AppID',
    component: TitleClearComponent
  }, {
    path: 'viewpublicnotice',
    component: PublicNoticeViewComponent
  }, {
    path: 'titleclearcompleted/:AppID',
    component: TitleClearCompleteComponent
  }, {
    path: 'View-Documents/:AppID',
    component: ViewFilterDocumentsComponent
  }, {
    path: 'bulkupload',
    component: BulkUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankModuleRoutingModule { }
