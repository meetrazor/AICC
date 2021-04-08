import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { GeneralService } from "./../../services/general.service";
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterContentChecked,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

@Component({
  selector: "app-view-tax",
  templateUrl: "./view-tax.component.html",
  styleUrls: ["./view-tax.component.scss"],
})
export class ViewTaxComponent
  implements OnInit, AfterViewInit, AfterContentChecked, OnChanges {
  @ViewChild('DemandForm', { static: true }) DemandFormModal
  @Input() propertyID: number;
  @Input() refresh: number;
  currenttax: number = null;
  demandForm: FormGroup;
  fileExtension: string = '';
  submited: boolean = false;
  constructor(
    private service: GeneralService,
    private datepipe: DatePipe,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  currentUser: any;
  @Input() item: any;
  isLoading: boolean;
  isUpload: boolean;
  ngOnInit() {
    this.currentUser = this.service.getcurrentUser()
    this.isUpload = false;
    this.isLoading = true;
    this.dtOptions = {
      ajax: {
        url: this.service.GetBaseUrl() + `property/${this.propertyID}/tax/list`,
      },
      responsive: true,
      columns: [
        {
          title: "Sr No.",
          data: "row",
          render: (data, type, row, meta) => {
            return meta.row + 1;
          },
        },
        {
          title: "Amount Due Date",
          data: "DueDate",
          render: (data) => {
            return this.datepipe.transform(data, "MMM, dd yyyy");
          },
        },
        {
          title: "Amount Due",
          data: "AmountDue",
        },
        {
          title: "Tax Type",
          data: "PropertyTaxName",
        },
        {
          title: "Demand Notice",
          data: null,
        },
        {
          title: "Payment Receipt",
          data: null,
        },
      ],
      autoWidth: false,
      columnDefs: [{ width: "18%", targets: [0, 1] }],
      rowCallback(row, data: any) {
        let upload = "";
        let demandNoticebtn = "";
        if (data.ReceiptID === null) {
          upload +=
            '<a href="javascript:void(0)" class="uploadReceipt m-1" title="Upload Receipt" receipt-id="' +
            data.PropertyTaxID +
            '">';
          upload +=
            '<i class="mdi mdi-file-upload-outline font-18 text-secondary" aria-hidden="false" receipt-id="' +
            data.PropertyTaxID +
            '"></i>';
          upload += "</a>";
        } else if (data.ReceiptID !== null) {
          upload +=
            '<a href="javascript:void(0)" class="viewReceipt m-1" title="view Receipt" receipt-id="' +
            data.ReceiptID +
            '">';
          upload +=
            '<i class="mdi mdi-eye font-18 text-secondary" aria-hidden="false" receipt-id="' +
            data.ReceiptID +
            '"></i>';
          upload += "</a>";
        }
        if (data.DemandNoticeID === null) {
          upload = '';
          demandNoticebtn +=
            '<a href="javascript:void(0)" class="uploadDemandNotice m-1" title="Upload Demand Notice" tax-id="' +
            data.PropertyTaxID +
            '">';
          demandNoticebtn +=
            '<i class="mdi mdi-file-upload-outline font-18 text-secondary" aria-hidden="false" tax-id="' +
            data.PropertyTaxID +
            '"></i>';
          demandNoticebtn += "</a>";
        } else if (data.DemandNoticeID !== null) {
          // tslint:disable-next-line: max-line-length
          demandNoticebtn +=
            '<a href="javascript:void(0)" class="viewDemandNotice m-1" title="view Demand Notice" notice-id="' +
            data.DemandNoticeID +
            '">';
          demandNoticebtn +=
            '<i class="mdi mdi-eye font-18 text-secondary" aria-hidden="false" notice-id="' +
            data.DemandNoticeID +
            '"></i>';
          demandNoticebtn += "</a>";
        }
        $("td:eq(5)", row).html(upload);
        $("td:eq(4)", row).html(demandNoticebtn);
      },
      drawCallback: () => {
        $(".uploadReceipt").on("click", (e) => {
          this.onUploadReceipt($(e.target).attr("receipt-id"));
        });
        $(".viewReceipt").on("click", (e) => {
          this.onViewReceipt($(e.target).attr("receipt-id"));
        });
        $(".viewDemandNotice").on("click", (e) => {
          this.onViewDemandNotice($(e.target).attr("notice-id"));
        });
        $(".uploadDemandNotice").on("click", (e) => {
          this.onUploadDemandNotice($(e.target).attr("tax-id"));
        });
      },
    };
  }
  get a() {
    return this.demandForm.controls;
  }
  onUploadDemandNotice(taxID) {
    this.currenttax = taxID;
    this.initdemandForm()
    this.modalService.open(this.DemandFormModal)
  }
  callback() {
    return false
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
  initdemandForm() {
    this.demandForm = this.formBuilder.group({
      AmountDue: new FormControl('', [Validators.required, Validators.min(1)]),
      DueDate: new FormControl('', Validators.required),
      FileName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      ModifiedBy: new FormControl(this.currentUser.UserID, Validators.required),
      UserID: new FormControl(this.currentUser.UserID, Validators.required),
    });
    this.demandForm.controls.FileType.disable();
  }
  prepareSave() {
    const input = new FormData();
    input.append('FileName', this.demandForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.demandForm.get('FileType').value);
    input.append('Description', this.demandForm.get('Description').value);
    input.append('uploadfile', (this.demandForm.get('uploadfile').value)[0]);
    input.append('AmountDue', (this.demandForm.get('AmountDue').value));
    input.append('DueDate', (this.demandForm.get('DueDate').value));
    input.append('ModifiedBy', (this.demandForm.get('ModifiedBy').value));
    input.append('UserID', (this.demandForm.get('UserID').value));
    return input
  }
  onSaveDemand() {
    this.submited = true
    if (this.demandForm.valid) {
      this.isLoading = true;
      this.service.UploadTaxDemandNotice(this.propertyID, this.currenttax, this.prepareSave(), '?FileExistenceCheck=1')
        .subscribe(
          (data) => {
            this.isLoading = false;
            this.submited = false;
            if (data.error_code == 'ALREADY_EXISTS') {
              Swal.fire({
                title: data.error,
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
                  this.service.UploadTaxDemandNotice(this.propertyID, this.currenttax, this.prepareSave(), '?FileExistenceCheck=0').subscribe((response) => {
                    this.isLoading = false;
                    if (response.error) {
                      Swal.fire({
                        title: response.error_code,
                        text: response.error,
                        type: 'error'
                      });
                      return;
                    } else {
                      Swal.fire({
                        title: 'demand Notice Added Successfully!',
                        text: response.message,
                        type: 'success'
                      }).then(() => {
                        this.rerender()
                        this.demandForm.controls.uploadfile.setValue([]);
                        this.modalService.dismissAll()
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
              }).then(() => {
                this.rerender()
                this.demandForm.controls.uploadfile.setValue([]);
                this.modalService.dismissAll();
              });
            }
          });
    }
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
  ngAfterContentChecked() {
    this.isLoading = false;
  }
  onUploadReceipt(id) {
    this.router.navigate([`tax/uploadreceipt/${this.propertyID}/${id}`]);
  }
  onViewReceipt(id) {
    this.service.getDocument(this.propertyID, id).subscribe((res) => {
      if (res.status === 200) {
        const data = res.data[0];
        if (data) {
          // if (data.FileType === 'DOC') {
          window.location.href = data.FileURL;
          // } else {
          // this.router.navigate(['/property/ViewPdf', data.FileURL, data.FileType]);
          // }
        } else {
          Swal.fire({
            title: "Error",
            text: "Something's Wrong",
            type: "error",
          });
        }
      }
    });
  }
  onViewDemandNotice(id) {
    this.service.getDocument(this.propertyID, id).subscribe((res) => {
      if (res.status === 200) {
        const data = res.data[0];
        if (data) {
          // if (data.FileType === 'DOC') {
          window.location.href = data.FileURL;
          // } else {
          //   this.router.navigate(['/property/ViewPdf', data.FileURL, data.FileType]);
          // }
        } else {
          Swal.fire({
            title: "Error",
            text: "Something's Wrong",
            type: "error",
          });
        }
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.refresh.firstChange) {
      this.rerender();
    }
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  onchange(e) {
    if (e && e.length > 0) {
      if (e.length > 1) {
        this.a.uploadfile.setValue([e[0]]);
      }
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.a.FileType.setValue('');
      this.a.FileName.setValue('');
      this.a.Description.setValue('');
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
      this.a.FileType.setValue('Photo');
      this.a.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if (
      filetype.toLowerCase() === 'application/pdf' &&
      extension.toLowerCase() === 'pdf'
    ) {
      this.a.FileType.setValue('PDF');
      this.a.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.a.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error',
      });
    }
  }

}
