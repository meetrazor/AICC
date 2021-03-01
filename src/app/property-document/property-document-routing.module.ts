import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadPropertyDocumentComponent } from './upload-property-document/upload-property-document.component';

const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path : 'upload', component : UploadPropertyDocumentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyDocumentRoutingModule { }
