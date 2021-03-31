import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-it-return',
  templateUrl: './view-it-return.component.html',
  styleUrls: ['./view-it-return.component.scss'],
})
export class ViewItReturnComponent implements OnInit {
  @Input() trustID: number;
  isdropdownShow: boolean;
  data = [
    {
      lawyer: 'Adv. Alpesh Patel',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      Amount: '1,000',
      returnfiledate: '10/12/2020',
      return: 'xyz',
      order: 'pqr',
      id: 1,
    },
    {
      lawyer: 'Adv. Alpesh Patel',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      Amount: '1,000',
      returnfiledate: '10/12/2020',
      return: 'xyz',
      order: 'pqr',
      id: 2,
    },
    {
      lawyer: 'Adv. Alpesh Patel',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      Amount: '1,000',
      returnfiledate: '10/12/2020',
      return: 'xyz',
      order: 'pqr',
      id: 3,
    },
    {
      lawyer: 'Adv. Alpesh Patel',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      Amount: '1,000',
      returnfiledate: '10/12/2020',
      return: 'xyz',
      order: 'pqr',
      id: 4,
    },
    {
      lawyer: 'Adv. Alpesh Patel',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      Amount: '1,000',
      returnfiledate: '10/12/2020',
      return: 'xyz',
      order: 'pqr',
      id: 5,
    },
    {
      lawyer: 'Adv. Alpesh Patel',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      Amount: '1,000',
      returnfiledate: '10/12/2020',
      return: 'xyz',
      order: 'pqr',
      id: 6,
    },
  ];
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private datepipe: DatePipe
  ) {
    this.isdropdownShow = false;
  }

  ngOnInit() {
    console.log(this.trustID);

    this.dtOptions = {
      data: this.data,
      responsive: true,
      columns: [
        {
          title: 'Sr.No.',
          data: null,
          render: (data, type, row, meta) => {
            return meta.row + 1;
          },
        },
        {
          title: 'Lawyer',
          data: 'lawyer',
        },
        {
          title: 'Year',
          data: 'year',
        },
        {
          title: 'Amount',
          data: 'Amount',
        },
        {
          title: 'Return File Date',
          data: null,
          render: (data) => {
            return this.datepipe.transform(data.returnfiledate, 'MMM, dd yyyy');
          },
        },
        {
          title: 'Return',
          data: 'return',
        },
        {
          title: 'Order',
          data: 'order',
        },
        {
          title: 'Action',
          data: null,
          render(data) {
            return `<div style="display:flex">
            <a title="View This Property" href="${data.url}">
            <i class="btn font-18 mdi mdi-eye-check text-secondary"></i></a></div>`;
          },
        },
      ],
      // columnDefs: [{
      //   targets: [2],
      //   visible: true,

      // }]
    };
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('viewpropertyID')) {
        this.router.navigate([
          'property/view/' + event.target.getAttribute('viewpropertyID'),
        ]);
      }
    });
  }
}
