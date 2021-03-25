import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-addreturn',
  templateUrl: './addreturn.component.html',
  styleUrls: ['./addreturn.component.scss'],
})
export class AddreturnComponent implements OnInit {
  returnForm: FormGroup;
  numericRegex = '[0-9]+';
  submitted: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.returnForm = this.fb.group({
      lawyer: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.numericRegex),
      ]),
      date: new FormControl(null, [Validators.required]),
      return: new FormControl(null, [Validators.required]),
      order: new FormControl(null, [Validators.required]),
    });
  }
  get f() {
    return this.returnForm.controls;
  }
  onAdd() {
    this.submitted = true;
  }
}
