import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { DataTablesModule } from 'angular-datatables';
import { NgbTabsetModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrustRoutingModule } from './trust-routing.module';
import { SingleTrustViewComponent } from './single-trust-view/single-trust-view.component';
import { UIModule } from '../shared/ui/ui.module';
import { TrustBasicDetailsComponent } from './trust-basic-details/trust-basic-details.component';
import { TrustPropertiesComponent } from './trust-properties/trust-properties.component';

@NgModule({
  declarations: [SingleTrustViewComponent, TrustBasicDetailsComponent, TrustPropertiesComponent],
  imports: [
    CommonModule, UIModule, NgbTabsetModule, FileUploadModule, ReactiveFormsModule,
    TrustRoutingModule, DataTablesModule, NgbModalModule
  ]
})
export class TrustModule { }
