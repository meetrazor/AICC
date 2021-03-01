import { CookieService } from './../../../core/services/cookie.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, AfterViewInit {
  @ViewChild('emailOtpInput', { static: false }) emailOtpInputRef: any;
  @ViewChild('smsOtpInput', { static: false }) smsOtpInputRef: any;
  userID: number;
  resendOTP = false;
  obj = {
    TransactionType: 'For Login',
    CreatedBy: 1
  };
  OTPform: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  submitdata = {
    Email: {
      ID: '',
      OTP: '',
    },
    SMS: {
      ID: '',
      OTP: ''
    },
    ModifiedBy: '1'
  };
  time = 5 * 60;
  response: any;
  constructor(
    private service: GeneralService, private formBuilder: FormBuilder, private router: Router, private cookieservice: CookieService) { }

  ngOnInit() {
    this.userID = this.service.getUserID();
    // this.userID = 16;
    this.service.generateOTP(this.userID, this.obj).subscribe((res) => {
      this.submitdata.Email.ID = res.data[0].ID;
      this.submitdata.SMS.ID = res.data[1].ID;
    });
    this.OTPform = this.formBuilder.group({
      SMSOTP: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]{6}')])],
      EMAILOTP: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]{6}')])],
      StateID: ['1', Validators.required],
      CreatedBy: ['1', Validators.required],
    });
    this.timer();
  }

  get f() { return this.OTPform.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.OTPform.invalid) {
      return;
    }
    this.submitdata.Email.OTP = this.OTPform.value.EMAILOTP;
    this.submitdata.SMS.OTP = this.OTPform.value.SMSOTP;
    this.loading = true;
    this.service.validateOTP(this.submitdata).subscribe((res) => {
      if (res.error) {
        this.error = res.error;
        this.loading = false;
        return;
      } else {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.loading = false;
        this.cookieservice.setCookie('currentUser', JSON.stringify(res.data), 1);
        if (res.data[0].CompanyID === 1) {
          this.router.navigate(['/AICC']);
        } else {
          this.router.navigate(['/loan/dashboard']);
        }
      }

    });
  }
  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }
  onSMSOtpChange(event) {
    this.OTPform.controls.SMSOTP.setValue(event);
  }
  onEmailOtpChange(event) {
    this.OTPform.controls.EMAILOTP.setValue(event);
  }
  reSendOTP() {
    this.cleanOTPBox();
    this.time = 5 * 60;
    this.resendOTP = false;
    this.timer();
    this.service.generateOTP(this.userID, this.obj).subscribe((res) => {
      this.submitdata.Email.ID = res.data[0].ID;
      this.submitdata.SMS.ID = res.data[1].ID;

      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
  timer() {
    const intervel = setInterval(() => {
      if (this.time > 0.5) {
        this.time -= 1;
      } else {
        clearInterval(intervel);
        this.resendOTP = true;
      }
    }, 1000);
  }
  cleanOTPBox() {
    this.emailOtpInputRef.setValue('');
    this.smsOtpInputRef.setValue('');
  }
}
