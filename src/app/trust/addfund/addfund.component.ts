import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-addfund',
  templateUrl: './addfund.component.html',
  styleUrls: ['./addfund.component.scss'],
})
export class AddfundComponent implements OnInit {
  fundForm: FormGroup;
  numericRegex = '[0-9]+';
  submitted: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.fundForm = this.fb.group({
      fundamount: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.numericRegex),
      ]),

      funddate: new FormControl(null, [Validators.required]),
      fundyear: new FormControl(null, [Validators.required]),
    });
  }
  get f() {
    return this.fundForm.controls;
  }
  addFund() {
    console.log(this.fundForm);
  }
}
