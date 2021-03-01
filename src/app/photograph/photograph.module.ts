import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewPhotographComponent } from './view-photograph/view-photograph.component';
import { PhotographRoutingModule } from './photograph-routing.module';
import { AddPhotographComponent } from './add-photograph/add-photograph.component';
import { DetailsPhotographComponent } from './details-photograph/details-photograph.component';

@NgModule({
  declarations: [ViewPhotographComponent, AddPhotographComponent, DetailsPhotographComponent],
  imports: [
    CommonModule,
    PhotographRoutingModule,
    FileUploadModule,
    FormsModule, ReactiveFormsModule
  ], exports: [ViewPhotographComponent, AddPhotographComponent, DetailsPhotographComponent]
})
export class PhotographModule { }
