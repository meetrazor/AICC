import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-exam-certificate',
  templateUrl: './view-exam-certificate.component.html',
  styleUrls: ['./view-exam-certificate.component.scss'],
})
export class ViewExamCertificateComponent implements OnInit {
  @Input() trustID: number;
  isdropdownShow: boolean;
  data = [
    {
      certificatedate: '09/12/2020',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      renewaldate: '10/12/2020',
      id: 1,
    },
    {
      certificatedate: '09/12/2020',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      renewaldate: '10/12/2020',
      id: 2,
    },
    {
      certificatedate: '09/12/2020',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      renewaldate: '10/12/2020',
      id: 3,
    },
    {
      certificatedate: '09/12/2020',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      renewaldate: '10/12/2020',
      id: 4,
    },
    {
      certificatedate: '09/12/2020',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      renewaldate: '10/12/2020',
      id: 5,
    },
    {
      certificatedate: '09/12/2020',
      url:
        'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf',
      year: '2021',
      renewaldate: '10/12/2020',
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
          title: 'Certificate Date',
          data: null,
          render: (data) => {
            return this.datepipe.transform(
              data.certificatedate,
              'MMM, dd yyyy'
            );
          },
        },
        {
          title: 'Year',
          data: 'year',
        },
        {
          title: 'Next Renewal Date',
          data: null,
          render: (data) => {
            return this.datepipe.transform(data.renewaldate, 'MMM, dd yyyy');
          },
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
