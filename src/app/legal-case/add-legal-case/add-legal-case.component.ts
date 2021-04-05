import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-legal-case',
  templateUrl: './add-legal-case.component.html',
  styleUrls: ['./add-legal-case.component.scss'],
})
export class AddLegalCaseComponent implements OnInit {
  legalcaseForm: FormGroup;
  submitted = false;
  currentUser: any;
  @Input() PropertyID;
  @Output() reFresh: EventEmitter<{}> = new EventEmitter();

  isloading: boolean;
  regex = '[0-9a-zA-Z][a-z0-9A-Z ]+';
  caseTypes: Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: GeneralService
  ) {}

  ngOnInit() {
    this.isloading = true;
    this.currentUser = this.service.getcurrentUser();
    this.legalcaseForm = this.formBuilder.group({
      PropertyId: new FormControl(
        this.route.snapshot.params.id,
        Validators.required
      ),
      CaseNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex),
        Validators.maxLength(20),
      ]),
      CaseType: new FormControl(null, Validators.required),
      CaseDescription: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      Status: new FormControl(1, Validators.required),
      FilingNumber: new FormControl('', Validators.required),
      FilingDate: new FormControl('', Validators.required),
      RegistrationNumber: new FormControl('', Validators.required),
      RegistrationDate: new FormControl('', Validators.required),
      CNRNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex),
        Validators.maxLength(20),
      ]),
      Iam: new FormControl('P', Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
    });
    this.service.GetPropertyLegalCaseTypes().subscribe((Res) => {
      this.caseTypes = Res.data;
    });
    this.isloading = false;
  }
  isValid(event) {
    if (
      event.keyCode >= 48 &&
      event.keyCode <= 57 &&
      event.target.value.length < 10
    ) {
    } else {
      return false;
    }
  }
  get f() {
    return this.legalcaseForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.legalcaseForm.valid) {
      this.isloading = true;
      this.service
        .addLegalCase(this.route.snapshot.params.id, this.legalcaseForm.value)
        .subscribe((data) => {
          this.isloading = false;
          this.submitted = false;
          this.legalcaseForm.reset();
          if (data.status === 200) {
            Swal.fire({
              title: 'Added',
              text: data.message,
              type: 'success',
            }).then(() => {
              this.reFresh.emit();
            });
          } else {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error',
            });
          }
        });
    }
  }
  onIamChange(val) {}
}
