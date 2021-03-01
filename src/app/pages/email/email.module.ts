import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule, NgbPaginationModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';

import { EmailRoutingModule } from './email-routing.module';

import { UIModule } from '../../shared/ui/ui.module';

import { InboxComponent } from './inbox/inbox.component';
import { ReademailComponent } from './reademail/reademail.component';
import { ComposeemailComponent } from './composeemail/composeemail.component';


@NgModule({
  declarations: [InboxComponent, ReademailComponent, ComposeemailComponent],
  imports: [
    CommonModule,
    EmailRoutingModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbCollapseModule,
    UIModule,
    NgxEditorModule
  ]
})
export class EmailModule { }
