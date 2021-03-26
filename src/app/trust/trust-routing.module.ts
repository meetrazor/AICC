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
  { path: 'view/:trustID', component: SingleTrustViewComponent },
  { path: 'create', component: TrustCreateComponent },
  { path: 'addexiting', component: TrustCreateComponent },
  { path: 'return', component: ViewItReturnComponent },
  { path: 'certificate', component: ViewExamCertificateComponent },
  { path: 'audit', component: ViewAuditComponent },
  { path: 'fund', component: ViewFundComponent },
  { path: 'meeting', component: ViewMeetingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrustRoutingModule {}
