import { ArchwizardModule } from 'angular-archwizard';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { TimePipe } from 'src/app/pipes/time.pipe';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ConfirmComponent, PasswordresetComponent, TimePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule, ArchwizardModule,
    UIModule,
    AuthRoutingModule, NgOtpInputModule
  ]
})
export class AuthModule { }
