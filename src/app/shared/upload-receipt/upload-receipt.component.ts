import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';
import { CookieService } from 'src/app/core/services/cookie.service';

@Component({
  selector: 'app-upload-receipt-shared',
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss']
})
export class UploadReceiptComponent implements OnInit {
  photographForm: FormGroup;
  file: any;
  today = new Date();
  @Input() propertyId: string;
  @Input() taxId: string;
  @Input() rentId: string;
  isLoading: boolean;
  regex = "[a-zA-Z0-9][a-z0-9A-Z ]+";
  submited: boolean;
  fileExtension: string;
  currentUser: any;
  rentData: any;
  paymentMode = ['Cheque', 'NEFT/IMPS', 'Wallet', 'Cash'];
  constructor(private generalService: GeneralService, private router: Router, private cookie: CookieService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(this.cookie.getCookie('currentUser'));
    this.photographForm = new FormGroup({
      FileName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      PropertyID: new FormControl(this.propertyId, Validators.required),
      NextDueDate: new FormControl(null, [Validators.required]),
      ModeOfPayment: new FormControl(null, Validators.required),
      DocumentTypeId: new FormControl(null, Validators.required),
      PaymentDate: new FormControl(null, Validators.required),
      AmountPay: new FormControl(null, [Validators.required, Validators.min(1)]),
      ChequeNo: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
      ChequeName: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
      BankName: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
      BankBranchName: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
      TransactionID: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
      WalletName: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
      CreatedBy: new FormControl(this.currentUser.UserID),
      ModifiedBy: new FormControl(this.currentUser.UserID),
      UserID: new FormControl(this.currentUser.UserID),
      AmountFromAdvance: new FormControl(0),
    });
    this.submited = false;
    this.photographForm.controls.FileType.disable();
    if (this.taxId && !this.rentId) {
      this.photographForm.controls.DocumentTypeId.setValue(3);
      this.isLoading = false;
    } else if (!this.taxId && this.rentId) {
      this.photographForm.controls.DocumentTypeId.setValue(2);
      this.photographForm.controls.NextDueDate.disable();
      this.isLoading = true;
      this.generalService.getRentList(this.rentId).subscribe((res) => {
        this.isLoading = false;
        this.rentData = res.data.tenantinfo;
      });
    }
  }
  private prepareSave(): any {
    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.photographForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.photographForm.get('FileType').value);
    input.append('CreatedBy', this.photographForm.get('CreatedBy').value);
    input.append('ModifiedBy', this.photographForm.get('ModifiedBy').value);
    input.append('UserID', this.photographForm.get('UserID').value);
    input.append('Description', this.photographForm.get('Description').value);
    input.append('NextDueDate', this.photographForm.get('NextDueDate').value);
    input.append('PaymentDate', this.photographForm.get('PaymentDate').value);
    input.append('ModeOfPayment', this.photographForm.get('ModeOfPayment').value);
    input.append('DocumentTypeId', this.photographForm.get('DocumentTypeId').value);
    input.append('BankName', this.photographForm.get('BankName').value);
    input.append('BankBranchName', this.photographForm.get('BankBranchName').value);
    input.append('ChequeNo', this.photographForm.get('ChequeNo').value);
    input.append('ChequeName', this.photographForm.get('ChequeName').value);
    input.append('TransactionID', this.photographForm.get('TransactionID').value);
    input.append('WalletName', this.photographForm.get('WalletName').value);
    input.append('AmountFromAdvance', this.photographForm.get('AmountFromAdvance').value ? this.photographForm.get('AmountFromAdvance').value : 0);
    input.append('AmountPay', this.photographForm.get('AmountPay').value);
    input.append('PropertyID', this.propertyId);
    input.append('uploadfile', (this.photographForm.get('uploadfile').value) ? (this.photographForm.get('uploadfile').value)[0] : '');
    return input;
  }
  get f() { return this.photographForm.controls; }
  numeric(e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8
      )
    ) {
      return false;
    }
    if (e.target.value.length > 3) {
      if (e.keyCode != 8) {
        return false;
      }
    }
  }
  onSubmit() {

    this.submited = true;
    if (this.photographForm.valid) {
      // 1 is Property ID
      if (this.taxId && !this.rentId) {
        this.isLoading = true;
        this.generalService.uploadTaxReceipt(this.propertyId, this.taxId, this.prepareSave())
          .subscribe(data => {
            this.isLoading = false;
            this.photographForm.reset();
            if (data.status === 200) {
              this.submited = false;
              Swal.fire({
                title: 'Uploaded',
                text: data.message,
                type: 'success',
              }).then(() => {
                this.router.navigate([`/property/view/${this.propertyId}`]);
              });
            } else {
              Swal.fire({
                title: data.error_code,
                text: data.message,
                type: 'error'
              });
            }
          });
      } else if (!this.taxId && this.rentId) {
        this.isLoading = true;
        this.generalService.uploadRentReceipt(this.rentId, this.prepareSave())
          .subscribe(data => {
            this.isLoading = false;
            this.photographForm.reset();
            if (data.status === 200) {
              this.submited = false;
              Swal.fire({
                title: 'Uploaded',
                text: data.message,
                type: 'success',
              }).then(() => {
                this.router.navigate([`/property/view/${this.propertyId}`]);
              });
            } else {
              Swal.fire({
                title: data.error_code,
                text: data.error,
                type: 'error'
              });
            }
          });
      }
    }
  }
  onchange(e) {
    if (e && e.length > 0) {
      if (e.length > 1) {
        this.photographForm.controls.uploadfile.setValue([e[0]]);
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
      this.photographForm.controls.FileType.setValue('');
      this.photographForm.controls.FileName.setValue('');
      this.photographForm.controls.Description.setValue('');
      this.fileExtension = '';
    }
  }
  callback() {
    return false;
  }
  setform(fileName, filetype, extension) {
    if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.photographForm.controls.FileType.setValue('Photo');
      this.photographForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.photographForm.controls.FileType.setValue('PDF');
      this.photographForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.photographForm.controls.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error'
      });
    }
  }
  onSelect() {
    const paymentType = this.photographForm.get('ModeOfPayment').value;
    if (paymentType && paymentType === 'Cash') {
      this.f.ChequeNo.disable();
      this.f.ChequeName.disable();
      this.f.BankName.disable();
      this.f.BankBranchName.disable();
      this.f.TransactionID.disable();
      this.f.WalletName.disable();

      this.f.ChequeNo.setValue('');
      this.f.ChequeName.setValue('');
      this.f.BankName.setValue('');
      this.f.BankBranchName.setValue('');
      this.f.TransactionID.setValue('');
      this.f.WalletName.setValue('');

    } else if (paymentType && paymentType === 'Cheque') {
      this.f.ChequeNo.enable();
      this.f.ChequeName.enable();
      this.f.BankName.enable();
      this.f.BankBranchName.enable();
      this.f.TransactionID.disable();
      this.f.WalletName.disable();

      this.f.ChequeNo.setValue('');
      this.f.ChequeName.setValue('');
      this.f.BankName.setValue('');
      this.f.BankBranchName.setValue('');
      this.f.TransactionID.setValue('');
      this.f.WalletName.setValue('');
    } else if (paymentType && paymentType === 'NEFT/IMPS') {
      this.f.ChequeNo.disable();
      this.f.ChequeName.disable();
      this.f.BankName.enable();
      this.f.BankBranchName.disable();
      this.f.TransactionID.enable();
      this.f.WalletName.disable();

      this.f.ChequeNo.setValue('');
      this.f.ChequeName.setValue('');
      this.f.BankName.setValue('');
      this.f.BankBranchName.setValue('');
      this.f.TransactionID.setValue('');
      this.f.WalletName.setValue('');
    } else if (paymentType && paymentType === 'Wallet') {
      this.f.ChequeNo.disable();
      this.f.ChequeName.disable();
      this.f.BankName.enable();
      this.f.BankBranchName.disable();
      this.f.TransactionID.enable();
      this.f.WalletName.enable();

      this.f.ChequeNo.setValue('');
      this.f.ChequeName.setValue('');
      this.f.BankName.setValue('');
      this.f.BankBranchName.setValue('');
      this.f.TransactionID.setValue('');
      this.f.WalletName.setValue('');
    }
  }
}

