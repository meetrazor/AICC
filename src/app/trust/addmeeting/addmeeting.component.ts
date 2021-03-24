import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-addmeeting',
  templateUrl: './addmeeting.component.html',
  styleUrls: ['./addmeeting.component.scss'],
})
export class AddmeetingComponent implements OnInit {
  meetingForm: FormGroup;
  numericRegex = '[0-9]+';
  Date = new Date();
  submitted: boolean;
  regex = '[a-zA-Z][a-z0-9A-Z ]+';

  constructor(private fb: FormBuilder, private datepipe: DatePipe) {}

  ngOnInit() {
    this.meetingForm = this.fb.group({
      title: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),

      time: new FormControl(null, [Validators.required]),
      venue: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      status: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
    });
  }
  get f() {
    return this.meetingForm.controls;
  }
  onSubmit() {
    this.submitted = true;
  }
}
