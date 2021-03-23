import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-trust-create',
  templateUrl: './trust-create.component.html',
  styleUrls: ['./trust-create.component.scss'],
})
export class TrustCreateComponent implements OnInit {
  trustForm: FormGroup;
  regex = '[a-zA-Z][a-z0-9A-Z ]+';
  numericRegex = '[0-9]+';
  submitted: boolean = true;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.trustForm = this.fb.group({
      trustname: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      regno: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      regdate: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.numericRegex),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      trustees: this.fb.array([this.initTrustees()]),
    });
  }
  initTrustees(i?) {
    return this.fb.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      trusteeType: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.numericRegex),
      ]),
    });
  }
  addTrustees() {
    const control = this.trustForm.controls.trustees as FormArray;
    control.push(this.initTrustees());
  }
  get f() {
    return this.trustForm.controls;
  }
  save() {
    console.log(this.f);
  }
}
