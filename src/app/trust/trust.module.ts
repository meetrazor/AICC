import { PropertyModule } from './../property/property.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TrustCreateComponent } from './trust-create/trust-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { DataTablesModule } from 'angular-datatables';
import { NgbTabsetModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TrustRoutingModule } from './trust-routing.module';
import { SingleTrustViewComponent } from './single-trust-view/single-trust-view.component';
import { UIModule } from '../shared/ui/ui.module';
import { TrustBasicDetailsComponent } from './trust-basic-details/trust-basic-details.component';
import { TrustPropertiesComponent } from './trust-properties/trust-properties.component';
import { AddmeetingComponent } from './addmeeting/addmeeting.component';
import { AddfundComponent } from './addfund/addfund.component';
import { AddauditComponent } from './addaudit/addaudit.component';
import { AddExamCertificateComponent } from './add-exam-certificate/add-exam-certificate.component';
import { AddreturnComponent } from './addreturn/addreturn.component';
import { AddExistingPropertyComponent } from './add-existing-property/add-existing-property.component';

import { ViewItReturnComponent } from './view-it-return/view-it-return.component';
import { ViewExamCertificateComponent } from './view-exam-certificate/view-exam-certificate.component';
import { ViewAuditComponent } from './view-audit/view-audit.component';
import { ViewFundComponent } from './view-fund/view-fund.component';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';

@NgModule({
  declarations: [
    SingleTrustViewComponent,
    TrustCreateComponent,
    TrustBasicDetailsComponent,
    TrustPropertiesComponent,
    AddmeetingComponent,
    AddfundComponent,
    AddauditComponent,
    AddExamCertificateComponent,
    AddreturnComponent,
    ViewItReturnComponent,
    ViewExamCertificateComponent,
    ViewAuditComponent,
    ViewFundComponent,
    ViewMeetingComponent,
    AddExistingPropertyComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    NgbTabsetModule,
    FileUploadModule,
    ReactiveFormsModule,
    TrustRoutingModule,
    DataTablesModule,
    NgbModalModule,
    NgSelectModule,
    PropertyModule
  ],
  providers: [DatePipe],
})
export class TrustModule { }
