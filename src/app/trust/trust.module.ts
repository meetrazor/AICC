import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrustRoutingModule } from './trust-routing.module';
import { TrustCreateComponent } from './trust-create/trust-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [TrustCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TrustRoutingModule,
    NgSelectModule,
  ],
})
export class TrustModule {}
