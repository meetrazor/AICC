import {
  AfterContentChecked, AfterViewInit, Component, ElementRef,
  Input, OnChanges, OnInit, SimpleChanges, ViewChild
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'src/app/core/services/cookie.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.scss']
})
export class RentDetailsComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked {
  @Input() tenatID;
  fileExtension = '';
  @Input() tanentData;
  RentID: number;
  invoiceForm: FormGroup;
  receiptForm: FormGroup;
  submitted = false;
  submited = false;
  paymentMode = ['Cheque', 'NEFT/IMPS', 'Wallet', 'Cash'];
  @ViewChild('generateReceipt', { static: true }) generateReceiptModal;
  @ViewChild('uploadInvoice', { static: true }) uploadInvoiceModal;
  isLoading: boolean;
  Loading: boolean;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  Data: any;
  currentUser: any;
  constructor(
    private service: GeneralService, private datepipe: DatePipe, private cookie: CookieService, private router: Router,
    private modalService: NgbModal, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.Loading = true;
    this.currentUser = JSON.parse(this.cookie.getCookie('currentUser'));
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `property/rent/view/${this.tenatID}`, dataSrc: 'data.rentinfo' },
      responsive: true,
      columns: [
        {
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'RentDueDate', data: 'RentDueDate', render: ((data) => {
            return this.datepipe.transform(data, 'MMM, dd yyyy');
          })
        }, {
          title: 'RentAmount', data: 'RentAmount',
        },
        {
          title: 'Invoice', data: null
        },
        {
          title: 'Receipt', data: null,
        }
      ],
      deferRender: true,
      autoWidth: false,
      // columnDefs: [{ targets: [5], visible: false }],
      rowCallback(row, data: any) {
        const renttype = $('#renttype')[0].innerText;
        let invoice = '';
        let Receipt = '';
        if (renttype.toLowerCase() === 'payable') {
          if (data.InvoiceDocumentID === null) {
            invoice += '<a class="btn btn-primary UploadInvocie m-1" title="Upload Invoice" receipt-id="' + data.PropertyTenantID + '">';
            invoice += '<i class="mdi mdi-cloud-upload" aria-hidden="false" receipt-id="' + data.PropertyTenantID + '"></i>';
            invoice += '</a>';
          } else {
            invoice += '<a class="btn btn-secondary ViewInvocie m-1" title="View Invoice" receipt-id="' + data.InvoiceDocumentID + '">';
            invoice += '<i class="mdi mdi-eye" aria-hidden="false" receipt-id="' + data.InvoiceDocumentID + '"></i>';
            invoice += '</a>';
          }
          if (data.ReceiptDocumentID === null) {
            Receipt += '<a class="btn btn-primary Uploadreceipt m-1" title="Upload Receipt" receipt-id="' + data.PropertyTenantID + '">';
            Receipt += '<i class="mdi mdi-cloud-upload" aria-hidden="false" receipt-id="' + data.PropertyTenantID + '"></i>';
            Receipt += '</a>';
          } else {
            Receipt += '<a class="btn btn-secondary Viewreceipt m-1" title="View Receipt" receipt-id="' + data.ReceiptDocumentID + '">';
            Receipt += '<i class="mdi mdi-eye" aria-hidden="false" receipt-id="' + data.ReceiptDocumentID + '"></i>';
            Receipt += '</a>';
          }
        } else if (renttype.toLowerCase() === 'receivable') {
          if (data.InvoiceDocumentID === null) {
            invoice += '<a class="btn btn-primary GenerateInvocie m-1" title="Generate Invoice" receipt-id="' + data.PropertyRentID + '">';
            invoice += '<i class="mdi mdi-file-document" aria-hidden="false" receipt-id="' + data.PropertyRentID + '"></i>';
            invoice += '</a>';
          } else {
            invoice += '<a class="btn btn-secondary ViewInvocie m-1" title="View Invoice" receipt-id="' + data.InvoiceDocumentID + '">';
            invoice += '<i class="mdi mdi-eye" aria-hidden="false" receipt-id="' + data.InvoiceDocumentID + '"></i>';
            invoice += '</a>';
          }
          if (data.ReceiptDocumentID === null) {
            Receipt += '<a class="btn btn-primary Generatereceipt m-1" title="Generate Receipt" receipt-id="' + data.PropertyRentID + '">';
            Receipt += '<i class="mdi mdi-file-document" aria-hidden="false" receipt-id="' + data.PropertyRentID + '"></i>';
            Receipt += '</a>';
          } else {
            Receipt += '<a class="btn btn-secondary Viewreceipt m-1" title="View Receipt" receipt-id="' + data.ReceiptDocumentID + '">';
            Receipt += '<i class="mdi mdi-eye" aria-hidden="false" receipt-id="' + data.ReceiptDocumentID + '"></i>';
            Receipt += '</a>';
          }
        }
        // Receipt += '<a class="btn btn-primary ViewTanent m-1" title="View Tanent" receipt-id="' + data.PropertyTenantID + '">';
        // Receipt += '<i class="mdi mdi-eye" aria-hidden="false" receipt-id="' + data.PropertyTenantID + '"></i>';
        // Receipt += '</a>';

        $('td:eq(3)', row).html(invoice);
        $('td:eq(4)', row).html(Receipt);
      },
      drawCallback: (row) => {
        $('.UploadInvocie').on('click', (e) => {
          this.uploadInvoice(+$(e.target).attr('receipt-id'));
        });
        $('.GenerateInvocie').on('click', (e) => {
          this.generateInvocie(+$(e.target).attr('receipt-id'));
        });
        $('.Uploadreceipt').on('click', (e) => {
          this.uploadReceipt(+$(e.target).attr('receipt-id'));
        });
        $('.Generatereceipt').on('click', (e) => {
          this.generateReceipt(+$(e.target).attr('receipt-id'));
        });
        $('.Viewreceipt').on('click', (e) => {
          this.viewReceipt(+$(e.target).attr('receipt-id'));
        });
        $('.ViewInvocie').on('click', (e) => {
          this.viewInvoice(+$(e.target).attr('receipt-id'));
        });
      },
    };
    this.Loading = false;
  }
  get f() { return this.invoiceForm.controls; }

  get e() { return this.receiptForm.controls; }

  uploadInvoice(id) {
    this.uploadInvoiceForm(id);
    this.RentID = id;
    this.modalService.open(this.uploadInvoiceModal);
  }
  generateInvocie(id) {
    this.Loading = true;
    this.service.GenerateInvoice(id, this.currentUser.UserID).subscribe((res) => {
      this.rerender();
      this.Loading = false;
      if (res.error) {
        Swal.fire({
          title: res.error_code,
          text: res.error,
          type: 'error'
        });
        return;
      } else {
        Swal.fire({
          title: 'Success',
          text: res.message,
          type: 'success'
        });
        return;
      }
    });
  }
  uploadReceipt(id) {
    this.router.navigate([`rent/uploadreceipt/${this.tanentData.PropertyID}/${id}`]);
  }
  generateReceipt(id) {
    this.generateReceiptForm();
    this.RentID = id;
    this.modalService.open(this.generateReceiptModal);
  }
  viewInvoice(id) {
    this.Loading = true;
    this.service.getDocument(this.tanentData.PropertyID, id).subscribe((res) => {
      this.Loading = false;
      if (res.status === 200) {
        const data = res.data[0];
        if (data) {
          window.location.href = data.FileURL;
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Something\'s Wrong',
            type: 'error'
          });
        }
      }
    });
  }
  viewReceipt(id) {
    this.Loading = true;
    this.service.getDocument(this.tanentData.PropertyID, id).subscribe((res) => {
      this.Loading = false;
      if (res.status === 200) {
        const data = res.data[0];
        if (data) {
          window.location.href = data.FileURL;
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Something\'s Wrong',
            type: 'error'
          });
        }
      }
    });
  }
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

  render() {
    this.dtTrigger.next();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.tenatID && !changes.tenatID.firstChange) {
      this.ngOnInit();
      // setTimeout(() => {
      this.rerender();
      // }, 2000);

    }
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
  ngAfterContentChecked() {
    // this.isLoading = false;
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first

      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  uploadInvoiceForm(id) {
    this.invoiceForm = this.formBuilder.group({
      InvoiceAmount: new FormControl('', [Validators.required, Validators.min(1)]),
      InvoiceDate: new FormControl('', Validators.required),
      FileName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      UserID: new FormControl(this.currentUser.UserID, Validators.required),
    });
    this.invoiceForm.controls.FileType.disable();
  }

  generateReceiptForm() {
    this.receiptForm = this.formBuilder.group({
      ModeOfPayment: new FormControl(null, Validators.required),
      PaymentDate: new FormControl(null, Validators.required),
      AmountPay: new FormControl(null, Validators.required),
      ChequeNo: new FormControl(null, Validators.required),
      ChequeName: new FormControl(null, Validators.required),
      BankName: new FormControl(null, Validators.required),
      BankBranchName: new FormControl(null, Validators.required),
      TransactionID: new FormControl(null, Validators.required),
      WalletName: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID),
      ModifiedBy: new FormControl(null),
      AmountFromAdvance: new FormControl(0, Validators.max(this.tanentData.RemainingAdvanceAmount)),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.invoiceForm.valid) {
      this.Loading = true;
      this.service.UploadInvoice(this.RentID, this.prepareSave())
        .subscribe(
          (data) => {
            this.Loading = false;
            this.submitted = false;
            this.resetForm();
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
                  this.Loading = true;
                  this.service.UploadInvoiceConfirm(this.RentID, this.prepareSave()).subscribe((response) => {
                    this.Loading = false;
                    this.submitted = false;
                    this.resetForm();
                    if (response.error) {
                      Swal.fire({
                        title: response.error_code,
                        text: response.error,
                        type: 'error'
                      });
                      return;
                    } else {
                      Swal.fire({
                        title: 'Tax Added Successfully!',
                        text: response.message,
                        type: 'success',
                        timer: 2000
                      }).then(() => {
                        location.reload();
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
                location.reload();
                this.invoiceForm.controls.uploadfile.setValue([]);
              });
            }
          });
    }
  }
  onchange(e) {
    if (e && e.length > 0) {
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.invoiceForm.controls.FileType.setValue('');
      this.invoiceForm.controls.FileName.setValue('');
      this.invoiceForm.controls.Description.setValue('');
      this.fileExtension = '';
    }
  }
  setform(fileName, filetype, extension) {
    if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.invoiceForm.controls.FileType.setValue('Photo');
      this.invoiceForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.invoiceForm.controls.FileType.setValue('PDF');
      this.invoiceForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/msword' && extension.toLowerCase() === 'doc') ||
      (filetype.toLowerCase() === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        extension.toLowerCase() === 'docx')) {
      this.invoiceForm.controls.FileType.setValue('DOC');
      this.invoiceForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.invoiceForm.controls.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error'
      });
    }
  }
  prepareSave(): any {
    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.invoiceForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.invoiceForm.get('FileType').value);
    input.append('Description', this.invoiceForm.get('Description').value);
    input.append('uploadfile', (this.invoiceForm.get('uploadfile').value)[0]);
    input.append('InvoiceAmount', (this.invoiceForm.get('InvoiceAmount').value));
    input.append('InvoiceDate', (this.invoiceForm.get('InvoiceDate').value));
    input.append('CreatedBy', (this.invoiceForm.get('CreatedBy').value));
    input.append('UserID', (this.invoiceForm.get('UserID').value));
    return input;
  }
  resetForm() {
    this.f.FileName.reset();
    this.f.FileType.reset();
    this.f.Description.reset();
    this.f.InvoiceAmount.reset();
    this.f.InvoiceDate.reset();
    this.f.uploadfile.reset();
    this.f.uploadfile.setValue([]);
  }
  resetReceiptForm() {
    this.e.ModeOfPayment.reset();
    this.e.PaymentDate.reset();
    this.e.AmountPay.reset();
    this.e.ChequeNo.reset();
    this.e.ChequeName.reset();
    this.e.BankName.reset();
    this.e.BankBranchName.reset();
    this.e.TransactionID.reset();
    this.e.WalletName.reset();
    this.e.AmountFromAdvance.reset();
  }
  onGenerate() {
    this.submited = true;
    this.Loading = true;
    console.log(this.receiptForm.value);
    if (this.receiptForm.valid) {
      this.service.GenerateReceipt(this.RentID, this.receiptForm.value).subscribe((res) => {
        this.submited = false;
        this.Loading = false;
        this.resetReceiptForm();
        if (res.error) {
          Swal.fire({
            title: res.error_code,
            text: res.error,
            type: 'error'
          });
          return;
        } else {
          Swal.fire({
            title: 'Success!',
            text: res.message,
            type: 'success',
            timer: 2000
          }).then(() => {
            location.reload();
          });
        }
      });
    }
  }
  onSelect() {
    const paymentType = this.receiptForm.get('ModeOfPayment').value;
    if (paymentType && paymentType === 'Cash') {
      this.e.ChequeNo.disable();
      this.e.ChequeName.disable();
      this.e.BankName.disable();
      this.e.BankBranchName.disable();
      this.e.TransactionID.disable();
      this.e.WalletName.disable();

      this.e.ChequeNo.setValue('');
      this.e.ChequeName.setValue('');
      this.e.BankName.setValue('');
      this.e.BankBranchName.setValue('');
      this.e.TransactionID.setValue('');
      this.e.WalletName.setValue('');

    } else if (paymentType && paymentType === 'Cheque') {
      this.e.ChequeNo.enable();
      this.e.ChequeName.enable();
      this.e.BankName.enable();
      this.e.BankBranchName.enable();
      this.e.TransactionID.disable();
      this.e.WalletName.disable();

      this.e.ChequeNo.setValue('');
      this.e.ChequeName.setValue('');
      this.e.BankName.setValue('');
      this.e.BankBranchName.setValue('');
      this.e.TransactionID.setValue('');
      this.e.WalletName.setValue('');
    } else if (paymentType && paymentType === 'NEFT/IMPS') {
      this.e.ChequeNo.disable();
      this.e.ChequeName.disable();
      this.e.BankName.enable();
      this.e.BankBranchName.disable();
      this.e.TransactionID.enable();
      this.e.WalletName.disable();

      this.e.ChequeNo.setValue('');
      this.e.ChequeName.setValue('');
      this.e.BankName.setValue('');
      this.e.BankBranchName.setValue('');
      this.e.TransactionID.setValue('');
      this.e.WalletName.setValue('');
    } else if (paymentType && paymentType === 'Wallet') {
      this.e.ChequeNo.disable();
      this.e.ChequeName.disable();
      this.e.BankName.enable();
      this.e.BankBranchName.disable();
      this.e.TransactionID.enable();
      this.e.WalletName.enable();

      this.e.ChequeNo.setValue('');
      this.e.ChequeName.setValue('');
      this.e.BankName.setValue('');
      this.e.BankBranchName.setValue('');
      this.e.TransactionID.setValue('');
      this.e.WalletName.setValue('');
    }
  }
}
