import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CookieService } from 'src/app/core/services/cookie.service';
import { GeneralService } from 'src/app/services/general.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: ['./add-tax.component.scss']
})
export class AddTaxComponent implements OnInit {
  @Input() propertyID;
  @Input() propertyTypeID;
  @Input() revenueOffice;
  @Output() refresh = new EventEmitter<void>();
  taxForm: FormGroup;
  submitted = false;
  error = '';
  isLoading = false;
  userId: number;
  maxDate: Date;
  fileExtension: string;
  PropertyTypeData: any;
  currentUser: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: GeneralService, private cookie: CookieService) { }
  ngOnInit() {
    this.submitted = false;
    this.service.getpropertytaxtypeList(this.propertyTypeID).subscribe((res) => {
      this.PropertyTypeData = res.data;
    });
    this.currentUser = JSON.parse(this.cookie.getCookie('currentUser'));
    this.maxDate = new Date();
    this.taxForm = this.formBuilder.group({
      RevenueOffice: new FormControl(this.revenueOffice, [Validators.required, Validators.maxLength(255)]),
      PropertyTaxTypeID: new FormControl(null, [Validators.required]),
      FinancialTaxYear: new FormControl(null, [Validators.required]),
      AmountDue: new FormControl('', [Validators.required, Validators.min(1)]),
      DueDate: new FormControl('', Validators.required),
      FileName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      PropertyID: new FormControl(this.propertyID),
      DocumentTypeId: new FormControl(3),
    });
    this.taxForm.controls.FileType.disable();
    this.taxForm.controls.RevenueOffice.disable();
  }
  prepareSave(): any {
    const input = new FormData();
    const year = +(this.taxForm.get('FinancialTaxYear').value).slice(0, 4);
    const nextyear = +year + 1;
    const FinancialTaxYear = `${year}-${nextyear}`;
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.taxForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.taxForm.get('FileType').value);
    input.append('PropertyTaxTypeID', this.taxForm.get('PropertyTaxTypeID').value);
    input.append('Description', this.taxForm.get('Description').value);
    input.append('FinancialTaxYear', FinancialTaxYear);
    input.append('uploadfile', (this.taxForm.get('uploadfile').value)[0]);
    input.append('AmountDue', (this.taxForm.get('AmountDue').value));
    input.append('DueDate', (this.taxForm.get('DueDate').value));
    input.append('CreatedBy', (this.taxForm.get('CreatedBy').value));
    input.append('PropertyID', (this.taxForm.get('PropertyID').value));
    input.append('DocumentTypeId', this.taxForm.get('DocumentTypeId').value);
    return input;
  }
  get f() { return this.taxForm.controls; }

  valid(e) {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      // tslint:disable-next-line: triple-equals
      || e.keyCode == 8)) {
      return false;
    }
    if (e.target.value.length > 7) {
      // tslint:disable-next-line: triple-equals
      if (e.keyCode != 8) {
        return false;
      }
    }
  }

  callback() {
    return false;
  }

  onSubmit() {
    // console.log(this.taxForm.value.uploadfile[0]);
    // return;
    this.submitted = true;
    if (this.taxForm.valid) {
      this.isLoading = true;
      this.service.addtax(this.propertyID, this.prepareSave())
        .subscribe(
          (data) => {
            this.isLoading = false;
            if (data.error) {
              Swal.fire({
                title: data.error_code,
                text: data.error,
                type: 'error'
              });
              return;
            } else if (data.data[0].Error) {
              Swal.fire({
                title: data.data[0].Error,
                text: 'You want to Replace this?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Replace it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success mt-2',
                cancelButtonClass: 'btn btn-danger ml-2 mt-2',
                buttonsStyling: false
              }).then((result) => {
                if (result.value) {
                  this.isLoading = true;
                  this.service.addtaxconfirm(this.propertyID, this.prepareSave()).subscribe((response) => {
                    this.isLoading = false;
                    if (data.error) {
                      Swal.fire({
                        title: data.error_code,
                        text: data.error,
                        type: 'error'
                      });
                      return;
                    } else {
                      Swal.fire({
                        title: 'Tax Added Successfully!',
                        text: data.message,
                        type: 'success',
                        timer: 2000
                      }).then(() => {
                        this.refresh.emit();
                        this.taxForm.controls.uploadfile.setValue([]);
                        this.ngOnInit();
                      });
                    }
                  });

                } else if (
                  // Read more about handling dismissals
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  Swal.fire({
                    title: 'Cancelled',
                    text: 'Your tax file is safe :)',
                    type: 'error'
                  });
                }
              });
              return;
            } else {
              Swal.fire({
                title: 'Tax Added Successfully!',
                text: data.message,
                type: 'success',
                timer: 2000
              }).then(() => {
                this.refresh.emit();
                this.taxForm.controls.uploadfile.setValue([]);
                this.ngOnInit();
              });
            }
          });
    }
    // this.isLoading = false;
  }

  onchange(e) {
    if (e && e.length > 0) {
      if (e.length > 1) {
        this.taxForm.controls.uploadfile.setValue([e[0]]);
        return
      }
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.taxForm.controls.FileType.setValue('');
      this.taxForm.controls.FileName.setValue('');
      this.taxForm.controls.Description.setValue('');
      this.fileExtension = '';
    }
  }
  setform(fileName, filetype, extension) {
    if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.taxForm.controls.FileType.setValue('Photo');
      this.taxForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.taxForm.controls.FileType.setValue('PDF');
      this.taxForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.taxForm.controls.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error'
      });
    }
  }
}
