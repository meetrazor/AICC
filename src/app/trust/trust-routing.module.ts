import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExamCertificateComponent } from './add-exam-certificate/add-exam-certificate.component';
import { AddauditComponent } from './addaudit/addaudit.component';
import { AddfundComponent } from './addfund/addfund.component';
import { AddmeetingComponent } from './addmeeting/addmeeting.component';
import { AddreturnComponent } from './addreturn/addreturn.component';
import { TrustCreateComponent } from './trust-create/trust-create.component';

const routes: Routes = [
  { path: 'create', component: TrustCreateComponent },
  { path: 'addmeeting', component: AddmeetingComponent },
  { path: 'addfund', component: AddfundComponent },
  { path: 'addaudit', component: AddauditComponent },
  { path: 'addcertificate', component: AddExamCertificateComponent },
  { path: 'addreturn', component: AddreturnComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrustRoutingModule {}
