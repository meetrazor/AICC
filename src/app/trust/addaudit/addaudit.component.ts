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
  selector: 'app-addaudit',
  templateUrl: './addaudit.component.html',
  styleUrls: ['./addaudit.component.scss'],
})
export class AddauditComponent implements OnInit {
  @Input() trustID: number;
  @Output() reFresh = new EventEmitter();
  auditForm: FormGroup;
  regex = '[a-zA-Z][a-z0-9A-Z ]+';
  numericRegex = '[0-9]+';
  submitted: boolean;
  currentUser: any;
  isLoading: boolean;
  fileExtension: string;
  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private service: GeneralService
  ) {}

  ngOnInit() {
    this.currentUser = this.service.getcurrentUser();
    this.auditForm = this.fb.group({
      FinYear: new FormControl(null, [Validators.required]),
      AuditDate: new FormControl(null, [Validators.required]),
      // name: new FormControl(null, [
      //   Validators.required,
      //   Validators.pattern(this.regex),
      // ]),
      // email: new FormControl(null, [
      //   Validators.required,
      //   Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      // ]),
      // mobile: new FormControl(null, [
      //   Validators.required,
      //   Validators.maxLength(10),
      //   Validators.minLength(10),
      //   Validators.pattern(this.numericRegex),
      // ]),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      FileName: new FormControl(null, [Validators.required]),
      FileType: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      uploadfile: new FormControl(null, Validators.required),
      TrustID: new FormControl(this.trustID, Validators.required),
    });
  }
  get f() {
    return this.auditForm.controls;
  }
  resetForm() {
    this.f.FinYear.reset();
    this.f.AuditDate.reset();
    this.f.FileName.reset();
    this.f.FileType.reset();
    this.f.Description.reset();
    this.f.uploadfile.setValue([]);
  }
  onSubmit() {
    this.submitted = true;
    if (this.auditForm.valid) {
      // 1 is Property ID
      this.isLoading = true;
      this.service.AddAudit(this.prepareSave()).subscribe((data) => {
        this.isLoading = false;
        this.resetForm();
        if (data.status === 200) {
          this.submitted = false;
          Swal.fire({
            title: 'Audit Uploaded',
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
      this.auditForm.get('FileName').value + '.' + this.fileExtension
    );
    input.append('FileType', this.auditForm.get('FileType').value);
    input.append('Description', this.auditForm.get('Description').value);
    input.append('CreatedBy', this.auditForm.get('CreatedBy').value);
    input.append('TrustID', this.auditForm.get('TrustID').value);
    input.append(
      'AuditDate',
      this.datepipe.transform(this.auditForm.get('AuditDate').value)
    );
    input.append('FinYear', this.auditForm.get('FinYear').value);
    input.append('uploadfile', this.auditForm.get('uploadfile').value[0]);
    return input;
  }
}
