import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UIModule } from '../shared/ui/ui.module';
import { NgbModalModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AdminViewComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule,
    UIModule,
    NgbTabsetModule,
    FileUploadModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModalModule,
    NgSelectModule,
  ],
  providers: [DatePipe],
})
export class AdminModule {}
