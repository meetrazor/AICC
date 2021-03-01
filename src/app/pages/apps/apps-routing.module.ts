import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';
import { CompaniesComponent } from './companies/companies.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
    {
        path: 'kanbanboard',
        component: KanbanboardComponent
    },
    {
        path: 'companies',
        component: CompaniesComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'tickets',
        component: TicketsComponent
    },
    {
        path: 'contacts',
        component: ContactsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
