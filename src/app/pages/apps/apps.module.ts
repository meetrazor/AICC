import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {
  NgbDropdownModule, NgbModalModule, NgbTypeaheadModule,
  NgbPaginationModule, NgbProgressbarModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ngx-drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './apps-routing.module';

import { UIModule } from '../../shared/ui/ui.module';

import { CompaniesComponent } from './companies/companies.component';
import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TicketsSortableDirective } from './tickets/tickets-sortable.directive';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [KanbanboardComponent, CompaniesComponent, CalendarComponent, TicketsComponent, TicketsSortableDirective, ContactsComponent, ProjectsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbDropdownModule,
    UIModule,
    FormsModule,
    DndModule,
    NgbModalModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FullCalendarModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    NgbTypeaheadModule,
    NgbProgressbarModule,
    NgbTooltipModule
  ],

})
export class AppsModule { }
