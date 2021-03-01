import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLegalCaseComponent } from './add-legal-case/add-legal-case.component';
import { LegalCaseRoutingModule } from './legal-case-routing.module';
import { ViewLegalCaseComponent } from './view-legal-case/view-legal-case.component';
import { UIModule } from '../shared/ui/ui.module';
import { DetailsLegalCaseComponent } from './details-legal-case/details-legal-case.component';
import { SharedModule } from '../shared/shared.module';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { CaseStatusComponent } from './case-status/case-status.component';
import { CasePetitionerComponent } from './case-petitioner/case-petitioner.component';
import { CaseRespondentComponent } from './case-respondent/case-respondent.component';

@NgModule({
  declarations: [AddLegalCaseComponent, ViewLegalCaseComponent, DetailsLegalCaseComponent, CaseDetailsComponent, CaseStatusComponent, CasePetitionerComponent, CaseRespondentComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, NgSelectModule, DataTablesModule,
    LegalCaseRoutingModule, UIModule, SharedModule, NgbTabsetModule
  ], exports: [AddLegalCaseComponent, ViewLegalCaseComponent]
})
export class LegalCaseModule { }
