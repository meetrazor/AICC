import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLegalCaseComponent } from './add-legal-case/add-legal-case.component';


const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path : 'create', component : AddLegalCaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalCaseRoutingModule { }
