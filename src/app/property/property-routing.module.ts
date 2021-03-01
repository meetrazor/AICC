import { SinglePropertyViewComponent } from './single-property-view/single-property-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { ViewPdfComponent } from './view-pdf/view-pdf.component';
const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path: 'create', component: AddPropertyComponent },
  { path: 'view/:id', component: SinglePropertyViewComponent },
  { path: 'edit/:id', component: AddPropertyComponent },
  { path: 'ViewPdf/:url/:filetype', component: ViewPdfComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
