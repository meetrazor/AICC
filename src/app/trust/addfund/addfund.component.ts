import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addfund',
  templateUrl: './addfund.component.html',
  styleUrls: ['./addfund.component.scss'],
})
export class AddfundComponent implements OnInit {
  @Input() trustID: number;
  @Output() reFresh = new EventEmitter();
  fundForm: FormGroup;
  numericRegex = '[0-9]+';
  fileExtension: string;
  currentUser: any;
  submitted: boolean;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private service: GeneralService
  ) {
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.fundForm = this.fb.group({
      FundAmount: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.numericRegex),
      ]),

      FundRegisterDate: new FormControl(null, [Validators.required]),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      FundNextDueDate: new FormControl(null, [Validators.required]),
      FinYear: new FormControl(null, [Validators.required]),
      FileName: new FormControl(null, [Validators.required]),
      FileType: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      uploadfile: new FormControl(null, Validators.required),
      TrustID: new FormControl(this.trustID, Validators.required),
    });
  }
  get f() {
    return this.fundForm.controls;
  }

  resetForm() {
    this.f.FundAmount.reset();
    this.f.FundRegisterDate.reset();
    this.f.FundNextDueDate.reset();
    this.f.FinYear.reset();
    this.f.FileName.reset();
    this.f.FileType.reset();
    this.f.Description.reset();
    this.f.uploadfile.setValue([]);
  }
  onSubmit() {
    this.submitted = true;
    if (this.fundForm.valid) {
      // 1 is Property ID
      this.isLoading = true;
      this.service.AddFund(this.prepareSave()).subscribe((data) => {
        this.isLoading = false;
        this.resetForm();
        if (data.status === 200) {
          this.submitted = false;
          Swal.fire({
            title: 'Fund Uploaded',
            text: data.message,
            type: 'success',
          }).then(() => {
            this.submitted = false;
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
  onchange(e) {
    if (e && e.length > 0) {
      if (e.length > 1) {
        this.f.uploadfile.setValue([e[0]]);
      }
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.f.FileType.setValue('');
      this.f.FileName.setValue('');
      this.f.Description.setValue('');
      this.fileExtension = '';
    }
  }
  setform(fileName, filetype, extension) {
    if (
      (filetype.toLowerCase() === 'image/jpeg' &&
        (extension.toLowerCase() === 'jpg' ||
          extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' &&
        extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' &&
        extension.toLowerCase() === 'png')
    ) {
      this.f.FileType.setValue('Photo');
      this.f.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if (
      filetype.toLowerCase() === 'application/pdf' &&
      extension.toLowerCase() === 'pdf'
    ) {
      this.f.FileType.setValue('PDF');
      this.f.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.f.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error',
      });
    }
  }
  prepareSave(): any {
    const input = new FormData();
    input.append(
      'FileName',
      this.fundForm.get('FileName').value + '.' + this.fileExtension
    );
    input.append('FileType', this.fundForm.get('FileType').value);
    input.append('Description', this.fundForm.get('Description').value);
    input.append('FundAmount', this.fundForm.get('FundAmount').value);
    input.append('CreatedBy', this.fundForm.get('CreatedBy').value);
    input.append('TrustID', this.fundForm.get('TrustID').value);
    input.append(
      'FundRegisterDate',
      this.datepipe.transform(this.fundForm.get('FundRegisterDate').value)
    );
    input.append(
      'FundNextDueDate',
      this.datepipe.transform(this.fundForm.get('FundNextDueDate').value)
    );
    input.append('FinYear', this.fundForm.get('FinYear').value);
    input.append('uploadfile', this.fundForm.get('uploadfile').value[0]);
    return input;
  }
}
