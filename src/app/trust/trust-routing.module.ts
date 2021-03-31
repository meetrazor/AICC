import { AddExistingPropertyComponent } from './add-existing-property/add-existing-property.component';
import { TrustCreateComponent } from './trust-create/trust-create.component';
import { SingleTrustViewComponent } from './single-trust-view/single-trust-view.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewItReturnComponent } from './view-it-return/view-it-return.component';
import { ViewExamCertificateComponent } from './view-exam-certificate/view-exam-certificate.component';
import { ViewAuditComponent } from './view-audit/view-audit.component';
import { ViewFundComponent } from './view-fund/view-fund.component';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';

const routes: Routes = [
  { path: 'view-trust/:trustID', component: SingleTrustViewComponent },
  { path: 'create-trust', component: TrustCreateComponent },
  { path: 'addexiting/:trustID', component: AddExistingPropertyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrustRoutingModule { }
