import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  breadCrumbItems: any;
  currentUser: any;
  dtOptions: DataTables.Settings = {};
  constructor(private service: GeneralService, private datepipe: DatePipe, private renderer: Renderer2, private router: Router) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' },
    { label: 'Assignments', path: '/loan/assignment', active: true }];
  }

  ngOnInit() {
    this.currentUser = this.service.getcurrentUser();
    this.dtOptions = {
      // ajax: { url: this.service.GetBaseUrl() + `loan/application/View/Lawyer/${this.currentUser.UserID}` }, responsive: true,
      ajax: { url: this.service.GetBaseUrl() + `loan/application/View/Lawyer/${this.currentUser.UserID}` }, responsive: true,
      columns: [{
        title: 'id',
        data: 'AppID'
      },{
        title: 'Applicant',
        data: '', render: (data, type, row) => {
          return `${row.FirstName} ${row.LastName}`;
        }
      }, {
        title: 'Loan',
        data: 'Type_of_Loan'
      }, {
        title: 'Amount',
        data: 'LoanAmount'
      }, {
        title: 'Status',
        data: 'ApplicationStatus',render:(data)=>{
          if (data === 'Pending') {
            return `<span class="badge badge-danger p-1">${data}</span>`;
          }else if(data ==='Title Clear Complete'){
            return `<span class="badge badge-success p-1">${data}</span>`;
          }else if(data){
            return `<span class="badge badge-secondary p-1">${data}</span>`;
          }else{
            return data;
          }
        }
      }, {
        title: 'Action',
        data: null, render: (data, type, row) => {
          return `
          <a class="btn text-primary" title="Upload Documents"
          UploadID = "${row.AppID}"><i class="mdi mdi-file-upload-outline font-18 text-secondary"
          UploadID = "${row.AppID}" aria-hidden="false"></i></a>
          <a class="btn btn-xs btn-light" title="Continue Work"
          OpenID = "${row.AppID}"><i class="mdi mdi-pencil font-18 text-secondary" OpenID = "${row.AppID}" aria-hidden="false"></i></a>`;
        }
      }, {
        title: 'Date',
        data: 'CreatedAt',
        render: (data, type, row) => {
          return this.datepipe.transform(data, 'MMM dd,yyyy');
        }
      }, {
        title: 'Bank Name',
        data: 'BankName'
      }
      ],order:[[0,'desc']],columnDefs:[{targets:0 ,visible:false}]
    };
  }
  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('UploadID')) {
        this.router.navigate(['/loan/uploaddocument/' + event.target.getAttribute('UploadID')]);
      }
      if (event.target.hasAttribute('OpenID')) {
        this.router.navigate(['/loan/assignment/' + event.target.getAttribute('OpenID')]);
      }
    });
  }
}
