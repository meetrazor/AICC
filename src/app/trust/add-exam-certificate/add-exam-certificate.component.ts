import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-exam-certificate',
  templateUrl: './add-exam-certificate.component.html',
  styleUrls: ['./add-exam-certificate.component.scss'],
})
export class AddExamCertificateComponent implements OnInit {
  certificateForm: FormGroup;
  submitted: boolean;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.certificateForm = this.fb.group({
      date: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      renewaldate: new FormControl(null, [Validators.required]),
    });
  }
  get f() {
    return this.certificateForm.controls;
  }
  onAdd() {
    this.submitted = true;
  }
}
