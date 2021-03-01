import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxComponent } from './inbox/inbox.component';
import { ReademailComponent } from './reademail/reademail.component';
import { ComposeemailComponent } from './composeemail/composeemail.component';

const routes: Routes = [
    {
        path: 'inbox',
        component: InboxComponent
    },
    {
        path: 'read',
        component: ReademailComponent
    },
    {
        path: 'compose',
        component: ComposeemailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmailRoutingModule {}
