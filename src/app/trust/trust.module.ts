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

@NgModule({
  declarations: [SingleTrustViewComponent, TrustCreateComponent, TrustBasicDetailsComponent, TrustPropertiesComponent,
    AddmeetingComponent, AddfundComponent, AddauditComponent, AddExamCertificateComponent, AddreturnComponent],
  imports: [
    CommonModule, UIModule, NgbTabsetModule, FileUploadModule, ReactiveFormsModule,
    TrustRoutingModule, DataTablesModule, NgbModalModule, NgSelectModule
  ],
  providers: [DatePipe]
})
export class TrustModule { }
