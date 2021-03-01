import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddLawyerComponent} from './add-lawyer/add-lawyer.component';
import {LawyerRoutingModule} from './lawyer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ViewLawyerComponent } from './view-lawyer/view-lawyer.component';

@NgModule({
  declarations: [AddLawyerComponent, ViewLawyerComponent],
  imports: [
    CommonModule,
    LawyerRoutingModule,
    FormsModule, ReactiveFormsModule,
    AutocompleteLibModule
  ]
})
export class LawyerModule { }
