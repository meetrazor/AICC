import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, Input, OnInit, Output, ViewChild, AfterViewInit, AfterContentChecked, OnChanges, SimpleChanges } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-tax',
  templateUrl: './view-tax.component.html',
  styleUrls: ['./view-tax.component.scss']
})
export class ViewTaxComponent implements OnInit, AfterViewInit, AfterContentChecked, OnChanges {
  @Input() propertyID: number;
  @Input() refresh: number;
  constructor(
    private service: GeneralService, private datepipe: DatePipe,
    private router: Router, private sanitizer: DomSanitizer
  ) { }
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  @Input() item: any;
  isLoading: boolean;
  isUpload: boolean;
  ngOnInit() {
    this.isUpload = false;
    this.isLoading = true;
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `property/${this.propertyID}/tax/list` }, responsive: true,
      columns: [
        {
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'Amount Due Date', data: 'DueDate', render: ((data) => {
            return this.datepipe.transform(data, 'MMM, dd yyyy');

          })
        }, {
          title: 'Amount Due', data: 'AmountDue',
        }, {
          title: 'Tax Type', data: 'PropertyTaxName',
        }, {
          title: 'Demand Notice', data: null,
        }, {
          title: 'Receipt', data: null,
        }
      ],
      autoWidth: false,
      columnDefs: [{ width: '18%', targets: [0, 1] }],
      rowCallback(row, data: any) {
        let upload = '';
        let demandNoticebtn = '';
        if (data.ReceiptID === null) {
          upload += '<a href="javascript:void(0)" class="uploadReceipt m-1" title="Upload Receipt" receipt-id="' + data.PropertyTaxID + '">';
          upload += '<i class="mdi mdi-file-upload-outline font-18 text-secondary" aria-hidden="false" receipt-id="' + data.PropertyTaxID + '"></i>';
          upload += '</a>';
        } else if (data.ReceiptID !== null) {
          upload += '<a href="javascript:void(0)" class="viewReceipt m-1" title="view Receipt" receipt-id="' + data.ReceiptID + '">';
          upload += '<i class="mdi mdi-eye font-18 text-secondary" aria-hidden="false" receipt-id="' + data.ReceiptID + '"></i>';
          upload += '</a>';
        }
        if (data.DemandNoticeID === null) {

        } else if (data.DemandNoticeID !== null) {
          // tslint:disable-next-line: max-line-length
          demandNoticebtn += '<a href="javascript:void(0)" class="viewDemandNotice m-1" title="view Demand Notice" notice-id="' + data.DemandNoticeID + '">';
          demandNoticebtn += '<i class="mdi mdi-eye font-18 text-secondary" aria-hidden="false" notice-id="' + data.DemandNoticeID + '"></i>';
          demandNoticebtn += '</a>';
        }
        $('td:eq(5)', row).html(upload);
        $('td:eq(4)', row).html(demandNoticebtn);
      },
      drawCallback: () => {
        $('.uploadReceipt').on('click', (e) => {
          this.onUploadReceipt($(e.target).attr('receipt-id'));
        });
        $('.viewReceipt').on('click', (e) => {
          this.onViewReceipt($(e.target).attr('receipt-id'));
        });
        $('.viewDemandNotice').on('click', (e) => {
          this.onViewDemandNotice($(e.target).attr('notice-id'));
        });
      }
    };
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
  onViewDemandNotice(id) {
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

}
