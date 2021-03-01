import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  confirmForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  @ViewChild('emailOtpInput', { static: false }) OtpRef: any;
  @ViewChild('wizardForm', { static: false }) wizard: BaseWizardComponent;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: GeneralService) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      EmailORMobile: ['', [Validators.required,
      Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|^([0-9]{10})+$/)]],
      TransactionType: ['For Forgot Password']
    });
    this.confirmForm = this.formBuilder.group({
      OTPLogID: ['', Validators.required],
      OTP: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{6}')]],
      Password: ['', [Validators.required, Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/\$%?~\`\^\&*\)\(+=._-])[A-Za-z\d!@#/\$%?\`~\^\&*\)\(+=._-].{7,}')]],
    });
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }
  get e() { return this.confirmForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.error = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.service.forgotPassword(this.resetForm.value).subscribe((res) => {
      this.loading = false;
      if (res.status === 200) {
        this.error = '';
        this.success = res.message;
        this.e.OTPLogID.setValue(res.data.OTPLogID);
        setTimeout(() => {
          this.wizard.navigation.goToNextStep();
          this.submitted = false;
        }, 1000);
      } else {
        this.error = res.error;
      }
    });
  }
  onConfirmSubmit() {
    this.success = '';
    this.error = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.confirmForm.invalid) {
      return;
    }

    this.loading = true;
    this.service.submitForgotPassword(this.confirmForm.value).subscribe((res) => {
      this.loading = false;
      if (res.status === 200) {
        this.success = 'Password Changed Successfully';
        this.submitted = false;
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Password Reset Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']);
      } else {
        this.error = res.error;
      }
    });
  }
  onEmailOtpChange(event) {
    this.e.OTP.setValue(event);
  }
  cleanOTPBox() {
    this.OtpRef.setValue('');
  }
}
