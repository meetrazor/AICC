import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-addaudit',
  templateUrl: './addaudit.component.html',
  styleUrls: ['./addaudit.component.scss'],
})
export class AddauditComponent implements OnInit {
  auditForm: FormGroup;
  regex = '[a-zA-Z][a-z0-9A-Z ]+';
  numericRegex = '[0-9]+';
  submitted: boolean;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.auditForm = this.fb.group({
      year: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),

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
  get f() {
    return this.auditForm.controls;
  }
  onAdd() {
    this.submitted = true;
  }
}
