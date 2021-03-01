import {
  Component, Input, OnInit, ViewChild, AfterViewInit, AfterContentChecked,
  SimpleChanges, OnChanges, Renderer2, QueryList, ViewChildren
} from '@angular/core';
import { first } from 'rxjs/operators';
import { GeneralService } from '../../services/general.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked {
  @Input() propertyID;
  @Input() refresh;
  tenantData: any;
  datasource: null;
  submitted: boolean;
  invoiceForm: FormGroup;
  isLoading: boolean = false;
  RentID: number;
  submited: boolean = false;
  Loading: boolean = false;
  fileExtension: string;
  paymentMode = ['Cheque', 'NEFT/IMPS', 'Wallet', 'Cash'];
  @ViewChild('generateReceipt', { static: true }) generateReceiptModal;
  @ViewChild('uploadInvoice', { static: true }) uploadInvoiceModal;
  // showntable: boolean;
  // tenatID: number;
  isLoaded = false;
  receiptForm: FormGroup;
  dtOptions: DataTables.Settings[] = [];
  dtOptions2: DataTables.Settings = {};
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<any>;
  dtTrigger = new Subject();
  dtTrigger2 = new Subject();
  toady: string;
  tanentData: any;
  currentUser: any;
  constructor(
    private service: GeneralService, private router: Router, private datepipe: DatePipe, private renderer: Renderer2,
    private modalService: NgbModal, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.currentUser = this.service.getcurrentUser();
    // this.showntable = false;
    this.toady = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1))
      .slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2);
    this.dtOptions[0] = {
      ajax: {
        url: this.service.GetBaseUrl() + `property/${this.propertyID}/tenant/list`,
        dataSrc: 'data.ReceivableTenant'
      }, responsive: true,
      columns: [
        {
          title: 'Name', data: 'TenantName'
        }, {
          title: 'Status', render: (data: any, type: any, full: any) => {
            if (full.IsContractCancel) {
              return `<span class="text-12 p-1 badge badge-danger"> Contract Terminated </span>`;
            }
            return `${this.datepipe.transform(full.RentDueDate, 'MMM dd,yyyy')} <br>₹ ${full.MonthlyORDailyRent}`;
          },
        }, {
          title: 'Action', render: (data: any, type: any, full: any) => {
            if (full.IsContractCancel) {
              return `<span class="text-12 p-1 badge badge-danger"> Contract Terminated </span>`;
            }
            let invoice = '';
            let contract = '';
            let cancel = '';
            let receipt = '';
            if (full.RentContractID) {
              contract += '<a class="btn ViewAgreement " title="View Rent Agreement" ViewInvocie-id="' + full.RentContractID + '">';
              // tslint:disable-next-line: max-line-length
              contract += '<i class="mdi mdi-eye-outline font-18 text-success" aria-hidden="false" ViewInvocie-id="' + full.RentContractID + '"></i>';
              contract += '</a>';
            }
            if (full.InvoiceDocumentID === null) {
              // tslint:disable-next-line: max-line-length
              invoice += '<a class="btn GenerateInvocie " title="Generate Invoice" GenerateInvocie-id="' + full.PropertyRentID + '">';
              // tslint:disable-next-line: max-line-length
              invoice += '<i class="mdi mdi-file-compare font-18 text-warning" aria-hidden="false" GenerateInvocie-id="' + full.PropertyRentID + '"></i>';
              invoice += '</a>';
            } else {
              invoice += '<a class="btn ViewInvocie " title="View Invoice" ViewInvocie-id="' + full.InvoiceDocumentID + '">';
              // tslint:disable-next-line: max-line-length
              invoice += '<i class="mdi mdi-file-compare font-18 text-success" aria-hidden="false" ViewInvocie-id="' + full.InvoiceDocumentID + '"></i>';
              invoice += '</a>';
            }
            if (full.ReceiptDocumentID === null) {
              // tslint:disable-next-line: max-line-length
              receipt += '<a class="btn GenerateReceipt " title="Generate Receipt" GenerateReceipt-id="' + full.PropertyRentID + '" GenerateReceiptTenant-id="' + full.PropertyTenantID + '">';
              // tslint:disable-next-line: max-line-length
              receipt += '<i class="mdi mdi-clipboard-check-outline font-18 text-warning" aria-hidden="false" GenerateReceipt-id="' + full.PropertyRentID + '" GenerateReceiptTenant-id="' + full.PropertyTenantID + '" ></i>';
              receipt += '</a>';
            } else {
              receipt += '<a class="btn ViewReceipt" title="View Receipt" ViewInvocie-id="' + full.ReceiptDocumentID + '">';
              // tslint:disable-next-line: max-line-length
              receipt += '<i class="mdi mdi-clipboard-check-outline font-18 text-success" aria-hidden="false" ViewInvocie-id="' + full.ReceiptDocumentID + '"></i>';
              receipt += '</a>';
            }
            if (!full.IsContractCancel) {
              cancel += '<a class="btn cancelcontract " title="Cancel Contract" cancel-id="' + full.PropertyTenantID + '">';
              // tslint:disable-next-line: max-line-length
              cancel += '<i class="mdi mdi-cancel font-18 text-danger" aria-hidden="false" cancel-id="' + full.PropertyTenantID + '"></i>';
              cancel += '</a>';
            }
            return `${contract} ${invoice} ${receipt} ${cancel}`;
          },
        }, {
          title: 'Remarks', render: (data: any, type: any, full: any) => {
            return `<div style="font-size: 12px"; font-family: Nunito,sans-serif;>
            Cell : ${full.TenantMobile} <br> Email : ${full.TenantEmail}
            <br> Advance Deposite: ${full.AdvanceDeposite}
            <br> Since : ${this.datepipe.transform(full.ContractStartDate, 'MMM, dd yyyy')}
            <br> Remaining Deposite : ${full.RemainingAdvanceAmount}</div>`;
          },
        },
      ],

      autoWidth: false,
      columnDefs: [{ width: '18%', targets: [0, 1] }],
    };
    this.dtOptions[1] = {
      ajax: { url: this.service.GetBaseUrl() + `property/${this.propertyID}/tenant/list`, dataSrc: 'data.PayableTenant' }, responsive: true,
      columns: [
        {
          title: 'Name', data: 'TenantName'
        }, {
          title: 'Status', render: (data: any, type: any, full: any) => {
            if (full.IsContractCancel) {
              return `<span class="text-12 p-1 badge badge-danger"> Contract Terminated </span>`;
            }
            return `${this.datepipe.transform(full.RentDueDate, 'MMM, dd yyyy')} <br>₹ ${full.MonthlyORDailyRent}`;
          },
        }, {
          title: 'Action', render: (data: any, type: any, full: any) => {
            if (full.IsContractCancel) {
              return `<span class="text-12 p-1 badge badge-danger"> Contract Terminated </span>`;
            }
            let invoice = '';
            let receipt = '';
            let contract = '';
            let cancel = '';
            if (full.RentContractID) {
              contract += '<a class="btn ViewAgreement " title="View Rent Agreement" ViewInvocie-id="' + full.RentContractID + '">';
              // tslint:disable-next-line: max-line-length
              contract += '<i class="mdi mdi-eye-outline font-18 text-success" aria-hidden="false" ViewInvocie-id="' + full.RentContractID + '"></i>';
              contract += '</a>';
            }
            if (full.InvoiceDocumentID === null) {
              // tslint:disable-next-line: max-line-length
              invoice += '<a class="btn UploadInvocie m-1" title="Upload Invoice" UploadInvocie-id="' + full.PropertyRentID + '">';
              // tslint:disable-next-line: max-line-length
              invoice += '<i class="mdi mdi-file-upload-outline font-18 text-warning" aria-hidden="false" UploadInvocie-id="' + full.PropertyRentID + '"></i>';
              invoice += '</a>';
            } else {
              invoice += '<a class="btn ViewInvocie m-1" title="View Invoice" ViewInvocie-id="' + full.InvoiceDocumentID + '">';
              // tslint:disable-next-line: max-line-length
              invoice += '<i class="mdi mdi-file-compare font-18 text-success" aria-hidden="false" ViewInvocie-id="' + full.InvoiceDocumentID + '"></i>';
              invoice += '</a>';
            }
            if (full.ReceiptDocumentID === null) {
              // tslint:disable-next-line: max-line-length
              receipt += '<a class="btn UploadReceipt m-1" title="Upload Receipt" UploadReceipt-id="' + full.PropertyTenantID + '">';
              // tslint:disable-next-line: max-line-length
              receipt += '<i class="mdi mdi-file-upload-outline font-18 text-warning" aria-hidden="false" UploadReceipt-id="' + full.PropertyTenantID + '"></i>';
              receipt += '</a>';
            } else {
              receipt += '<a class="btn Viewreceipt m-1" title="View Receipt" ViewInvocie-id="' + full.ReceiptDocumentID + '">';
              // tslint:disable-next-line: max-line-length
              receipt += '<i class="mdi mdi-clipboard-check-outline font-18 text-success" aria-hidden="false" ViewInvocie-id="' + full.ReceiptDocumentID + '"></i>';
              receipt += '</a>';
            }
            if (!full.IsContractCancel) {
              cancel += '<a class="btn cancelcontract m-1" title="Cancel Contract" cancel-id="' + full.PropertyTenantID + '">';
              // tslint:disable-next-line: max-line-length
              cancel += '<i class="mdi mdi-cancel font-18 text-danger" aria-hidden="false" cancel-id="' + full.PropertyTenantID + '"></i>';
              cancel += '</a>';
            }
            return `${contract} ${invoice} ${receipt} ${cancel}`;
          },
        }, {
          title: 'Remarks', render: (data: any, type: any, full: any) => {
            return `<div style="font-size: 12px"; font-family: Nunito,sans-serif;>
            Cell : ${full.TenantMobile} <br> Email : ${full.TenantEmail}
            <br> Advance Deposite: ${full.AdvanceDeposite}
            <br> Since : ${this.datepipe.transform(full.ContractStartDate, 'MMM, dd yyyy')}
            <br> Remaining Deposite : ${full.RemainingAdvanceAmount}</div>`;
          },
        },
      ],

      autoWidth: false,
      columnDefs: [{ width: '18%', targets: [0, 1] }],
    };
    // this.service.listTenant(this.propertyID)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if (data.error) {
    //         Swal.fire({
    //           title: data.error_code,
    //           text: data.message,
    //           type: 'error'
    //         });
    //         return;
    //       } else {
    //         this.datasource = data.data;
    //         this.isLoaded = true;
    //       }
    //     });

  }
  ngAfterViewInit() {
    this.dtTrigger.next();
    this.dtTrigger2.next();
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('GenerateInvocie-id')) {
        this.generateinvoice(event.target.getAttribute('GenerateInvocie-id'));
      }
      if (event.target.hasAttribute('ViewInvocie-id')) {
        this.ViewDocument(event.target.getAttribute('ViewInvocie-id'));
      }
      if (event.target.hasAttribute('GenerateReceipt-id') && event.target.hasAttribute('GenerateReceiptTenant-id')) {
        this.GenerateReceipt(event.target.getAttribute('GenerateReceipt-id'), event.target.getAttribute('GenerateReceiptTenant-id'));
      }
      if (event.target.hasAttribute('UploadInvocie-id')) {
        this.UploadInvoice(event.target.getAttribute('UploadInvocie-id'));
      }
      if (event.target.hasAttribute('UploadReceipt-id')) {
        this.UploadReceipt(event.target.getAttribute('UploadReceipt-id'));
      }
      if (event.target.hasAttribute('cancel-id')) {
        this.CancelContract(event.target.getAttribute('cancel-id'));
      }
    });
  }
  CancelContract(id) {
    this.service.CancelRentContract(id).subscribe((Res) => {
      this.rerender();
    });
  }
  UploadReceipt(id) {
    this.router.navigate([`rent/uploadreceipt/${this.propertyID}/${id}`]);
  }
  UploadInvoice(id) {
    this.uploadInvoiceForm(id);
    this.RentID = id;
    this.modalService.open(this.uploadInvoiceModal);
  }
  GenerateReceipt(id, tenantID) {
    this.isLoaded = false;
    this.service.viewTenant(tenantID).subscribe((res) => {
      this.isLoaded = true;
      this.tanentData = res.data.tenantinfo;
      this.generateReceiptForm();
      this.RentID = id;
      this.modalService.open(this.generateReceiptModal);
    });
  }
  ViewDocument(id) {
    this.isLoaded = false;
    this.service.getDocument(this.propertyID, id).subscribe((res) => {
      this.isLoaded = true;
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
  generateinvoice(id) {
    this.isLoaded = false;
    this.service.GenerateInvoice(id, this.currentUser.UserID).subscribe((res) => {
      this.isLoaded = true;
      this.rerender();
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
  ngAfterContentChecked() {
    this.isLoaded = true;
  }
  onDeleteTenant(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success mt-2',
      cancelButtonClass: 'btn btn-danger ml-2 mt-2',
      buttonsStyling: false
    }).then((result) => {
      console.log(result);
      if (result.value) {
        this.service.deleteTenant(id).subscribe((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: 'Deleted!',
              text: res.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              location.reload();
              // this.router.navigate(['rent']);
            });
          } else {
            Swal.fire({
              title: res.error_code,
              text: res.message,
              type: 'error'
            });
          }
        }, (err) => {
          Swal.fire({
            title: 'Oops Something Wrong while deleting',
            text: err,
            type: 'error'
          });
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Opration Cancelled by User!',
          type: 'error'
        });
      }
    });
  }
  onDeleteRent(id) { }
  // onViewRent(id) {
  //   this.isLoaded = false;
  //   this.service.getRentList(id).subscribe((res) => {
  //     this.isLoaded = true;
  //     this.tanentData = res.data.tenantinfo;
  //     this.tenatID = id;
  //     this.showntable = true;
  //   });
  // }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.refresh.firstChange) {
      this.rerender();
    }
  }

  rerender(): void {
    this.dtElements.forEach((dtElement) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
      });
    });
    this.dtTrigger.next();
    this.dtTrigger2.next();
  }

  onUploadReceipt(id) {
    this.router.navigate([`rent/uploadreceipt/${this.propertyID}/${id}`]);
  }
  onViewReceipt(id) {
    this.service.getDocument(this.propertyID, id).subscribe((res) => {
      if (res.status === 200) {
        const data = res.data[0];
        if (data) {
          if (data.FileType === 'DOC') {
            window.location.href = data.FileURL;
          } else {
            this.router.navigate(['/property/ViewPdf', data.FileURL, data.FileType]);
          }
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
  generateReceiptForm() {
    this.receiptForm = this.formBuilder.group({
      ModeOfPayment: new FormControl(null, Validators.required),
      PaymentDate: new FormControl(null, Validators.required),
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
  onGenerate() {
    this.submited = true;
    this.Loading = true;
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
          }).then(() => {
            this.submited = false;
            this.Loading = false;
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
    this.Loading = false;
  }
  resetReceiptForm() {
    this.e.ModeOfPayment.reset();
    this.e.PaymentDate.reset();
    this.e.ChequeNo.reset();
    this.e.ChequeName.reset();
    this.e.BankName.reset();
    this.e.BankBranchName.reset();
    this.e.TransactionID.reset();
    this.e.WalletName.reset();
    this.e.AmountFromAdvance.reset();
  }
  get e() { return this.receiptForm.controls; }
  get f() { return this.invoiceForm.controls; }

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
  callback() {
    return false;
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
}
