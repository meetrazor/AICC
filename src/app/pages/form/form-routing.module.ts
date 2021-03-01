import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementsComponent } from './elements/elements.component';
import { ValidationComponent } from './validation/validation.component';
import { SummernoteComponent } from './summernote/summernote.component';
import { WizardComponent } from './wizard/wizard.component';
import { AdvancedformComponent } from './advancedform/advancedform.component';
import { UploadsComponent } from './uploads/uploads.component';
import { ImagecropComponent } from './imagecrop/imagecrop.component';

const routes: Routes = [
    {
        path: 'elements',
        component: ElementsComponent
    },
    {
        path: 'validation',
        component: ValidationComponent
    },
    {
        path: 'summernote',
        component: SummernoteComponent
    },
    {
        path: 'wizard',
        component: WizardComponent
    },
    {
        path: 'advanced',
        component: AdvancedformComponent
    },
    {
        path: 'uploads',
        component: UploadsComponent
    },
    {
        path: 'image-crop',
        component: ImagecropComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule {}
