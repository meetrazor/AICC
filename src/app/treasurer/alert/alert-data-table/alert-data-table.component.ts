import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert-data-table',
  templateUrl: './alert-data-table.component.html',
  styleUrls: ['./alert-data-table.component.scss']
})
export class AlertDataTableComponent implements OnInit, AfterViewInit {
  @Input() TaxData: Array<any>;
  @Input() RentData: Array<any>;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  isLoading: boolean;
  constructor(private datepipe: DatePipe) { }

  ngOnInit() {
    if (this.TaxData) {
      this.dtOptions = {
        data: this.TaxData,
        columns: [{
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'Due Date',
          data: 'DueDate', render: (data, type, row, meta) => {
            return this.datepipe.transform(data, 'MMM, dd yyyy');
          }
        }, {
          title: 'Amount Due(₹)', data: 'AmountDue'
        }, {
          title: 'Amount Pay(₹)', data: 'AmountPay'
        }, {
          title: 'Status', data: 'TaxStatus', render: (data) => {
            if (data === 'Pending') {
              return `<span class = "badge badge-danger p-1">${data}</span>`;
            }
            return `<span class = "badge badge-success p-1">${data}</span>`;
          }
        }]
      };
    } else if (this.RentData) {
      this.dtOptions = {
        data: this.RentData,
        columns: [{
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'Due Date',
          data: 'RentDueDate', render: (data, type, row, meta) => {
            return this.datepipe.transform(data, 'MMM, dd yyyy');
          }
        }, {
          title: 'Amount Due(₹)', data: 'RentAmount'
        }, {
          title: 'Status', data: 'RentStatus', render: (data) => {
            if (data === 'Pending') {
              return `<span class = "badge badge-danger p-1">${data}</span>`;
            }
            return `<span class = "badge badge-success p-1">${data}</span>`;
          }
        }]
      };
    }

  }
  ngAfterViewInit() {
    this.dtTrigger.next();
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
