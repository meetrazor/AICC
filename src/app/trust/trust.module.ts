import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TrustRoutingModule } from './trust-routing.module';
import { TrustCreateComponent } from './trust-create/trust-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddmeetingComponent } from './addmeeting/addmeeting.component';
import { AddfundComponent } from './addfund/addfund.component';
import { AddauditComponent } from './addaudit/addaudit.component';
import { AddExamCertificateComponent } from './add-exam-certificate/add-exam-certificate.component';
import { AddreturnComponent } from './addreturn/addreturn.component';

@NgModule({
  declarations: [TrustCreateComponent, AddmeetingComponent, AddfundComponent, AddauditComponent, AddExamCertificateComponent, AddreturnComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TrustRoutingModule,
    NgSelectModule,
  ],
  providers: [DatePipe],
})
export class TrustModule {}
