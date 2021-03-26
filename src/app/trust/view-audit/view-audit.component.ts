import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-audit',
  templateUrl: './view-audit.component.html',
  styleUrls: ['./view-audit.component.scss'],
})
export class ViewAuditComponent implements OnInit {
  @Input() trustID: number;
  isdropdownShow: boolean;
  data = [
    {
      year: '2021',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      auditdate: '10/12/2020',
      name: 'Meet',
      email: 'meet123@gmail.com',
      mobile: '9123456789',
      id: 1,
    },
    {
      year: '2021',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      auditdate: '10/12/2020',
      name: 'Meet',
      email: 'meet123@gmail.com',
      mobile: '9123456789',
      id: 2,
    },
    {
      year: '2021',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      auditdate: '10/12/2020',
      name: 'Meet',
      email: 'meet123@gmail.com',
      mobile: '9123456789',
      id: 3,
    },
    {
      year: '2021',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      auditdate: '10/12/2020',
      name: 'Meet',
      email: 'meet123@gmail.com',
      mobile: '9123456789',
      id: 4,
    },
    {
      year: '2021',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      auditdate: '10/12/2020',
      name: 'Meet',
      email: 'meet123@gmail.com',
      mobile: '9123456789',
      id: 5,
    },
    {
      year: '2021',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      auditdate: '10/12/2020',
      name: 'Meet',
      email: 'meet123@gmail.com',
      mobile: '9123456789',
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
          title: 'Year',
          data: 'year',
        },
        {
          title: 'Audit Date',
          data: null,
          render: (data) => {
            return this.datepipe.transform(data.auditdate, 'MMM, dd yyyy');
          },
        },
        {
          title: 'Name',
          data: 'name',
        },
        {
          title: 'Email',
          data: 'email',
        },
        {
          title: 'Mobile',
          data: 'mobile',
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
