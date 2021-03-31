import { Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trust-create',
  templateUrl: './trust-create.component.html',
  styleUrls: ['./trust-create.component.scss'],
})
export class TrustCreateComponent implements OnInit {
  trustForm: FormGroup;
  regex = '[a-zA-Z][a-z0-9A-Z ]+';
  numericRegex = '[0-9]+';
  submitted: boolean;
  currentUser: any;
  trusteetype: any;
  isLoading: Boolean;
  constructor(private fb: FormBuilder, private service: GeneralService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.service.GetTrusteeTypes().subscribe((res) => {
      this.trusteetype = res.data;
      this.isLoading = false;
    })
    this.currentUser = this.service.getcurrentUser();
    this.trustForm = this.fb.group({
      TrustName: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      RegistrationORNondhniNo: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      RegistrationDate: new FormControl(null, [Validators.required]),
      TrustEmailId: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      TrustPhoneNo: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.numericRegex),
      ]),
      TrustAddress: new FormControl(null, [
        Validators.required,
      ]),
      ProcessAppointmentTrustee: new FormControl(null, [
        Validators.required
      ]),
      TrusteeUsers: this.fb.array([this.initTrustees()]),
      CreatedBy: new FormControl(this.currentUser.UserID)
    });
  }
  initTrustees(i?) {
    return this.fb.group({
      Name: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      Address: new FormControl(null, [
        Validators.required
      ]),
      TrusteeUsertypeID: new FormControl(null, [Validators.required]),
      StartDate: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      Mobile: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.numericRegex),
      ]),
    });
  }
  addTrustees() {
    const control = this.trustForm.controls.TrusteeUsers as FormArray;
    control.push(this.initTrustees());
  }
  removeTrustees(i) {
    const control = this.trustForm.controls.TrusteeUsers as FormArray;
    control.removeAt(i);
  }
  get f() {
    return this.trustForm.controls;
  }
  save() {
    this.submitted = true;
    if (this.trustForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.service
      .AddTrust(this.trustForm.value)
      .pipe(first())
      .subscribe((data) => {
        this.isLoading = false;
        if (data.error) {
          Swal.fire({
            title: data.error_code,
            text: data.message,
            type: "error",
          });
          return;
        } else {
          Swal.fire({
            title: "Trust Added Successfully!",
            text: data.message,
            type: "success",
          }).then(() => {
            this.router.navigate(["/AICC/trust"]);
          });
        }
      });
  }
}
