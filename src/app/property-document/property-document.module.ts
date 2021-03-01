import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPropertyDocumentComponent } from './upload-property-document/upload-property-document.component';
import { PropertyDocumentRoutingModule } from './property-document-routing.module';

@NgModule({
  declarations: [UploadPropertyDocumentComponent],
  imports: [
    CommonModule,
    PropertyDocumentRoutingModule
  ]
})
export class PropertyDocumentModule { }
