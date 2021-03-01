import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  applicationData: any;
  appID: any;
  dtOptions: DataTables.Settings = {};
  isLoading: boolean;
  PVRData: any;
  PVRDetailsLoaded: boolean;
  DocumentList: Array<any>;
  constructor(private service: GeneralService, private Route: ActivatedRoute, private router: Router) {
    this.appID = this.Route.snapshot.params.AppID;
    this.isLoading = true;
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Assignments', path: '/loan/assignment' }];
  }

  ngOnInit() {
    this.DocumentList = [];
    this.service.GetApplicationInformation(this.Route.snapshot.params.AppID).subscribe((res) => {
      this.isLoading = false;
      this.PVRDetailsLoaded = false;
      this.applicationData = res.data[0];
      this.service.GetPVRData(this.Route.snapshot.params.AppID).subscribe((PVRData) => {
        this.PVRDetailsLoaded = true;
        this.PVRData = PVRData.data;
      });
      this.dtOptions = {
        ajax: { url: this.service.GetBaseUrl() + `loan/application/Documents/AppID/${this.Route.snapshot.params.AppID}` }, responsive: true,
        columns: [{
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'Document',
          data: 'DocumentName',
        }, {
          title: 'Status',
          render: (data, type, row) => {
            this.DocumentList.push(row);
            if (row.Status === 'Pending') {
              return `<span class="badge badge-danger p-1">${row.Status}</span>`;
            } else if (row.Status === 'Under Review') {
              return `<span class="badge badge-primary p-1">${row.Status}</span>`;
            } else {
              return `<span class="badge badge-success p-1">${row.Status}</span>`;
            }
          }
        }, {
          title: 'Action',
          data: null
        }
        ], rowCallback(row, data: any) {
          let btn = '';
          if (data.FileURL === null) {
            btn += '<a href="javascript:void(0)" class="uploadDocument m-1" title="Upload Document" receipt-id="' + data.ID + '">';
            btn += '<i class="mdi mdi-file-upload-outline font-18 text-secondary" aria-hidden="false" receipt-id="' + data.ID + '"></i>';
            btn += '</a>';
            btn += '<a href="javascript:void(0)" class="requestDocument m-1" title="Request this Document" receipt-id="' + data.ID + '">';
            btn += '<i class="mdi mdi mdi-file-question font-18 text-secondary" aria-hidden="false" receipt-id="' + data.ID + '"></i>';
            btn += '</a>';
          } else if (data.FileURL !== null) {
            btn += '<a href="javascript:void(0)" class="viewDocument m-1" title="View Document" receipt-id="' + data.DocumentID + '">';
            btn += '<i class="mdi mdi-eye font-18 text-secondary" aria-hidden="false" receipt-id="' + data.DocumentID + '"></i>';
            btn += '</a>';
            if (data.Status !== 'Reviewed') {
              btn += '<a href="javascript:void(0)" class="uploadDocument m-1" title="Upload Document" receipt-id="' + data.ID + '">';
              btn += '<i class="mdi mdi-file-upload-outline font-18 text-secondary" aria-hidden="false" receipt-id="' + data.ID + '"></i>';
              btn += '</a>';
              btn += '<a href="javascript:void(0)" class="requestDocument m-1" title="Request this Document" receipt-id="' + data.ID + '">';
              btn += '<i class="mdi mdi mdi-file-question font-18 text-secondary" aria-hidden="false" receipt-id="' + data.ID + '"></i>';
              btn += '</a>';
            }
          }
          $('td:eq(3)', row).html(btn);
        }, drawCallback: () => {
          $('.uploadDocument').on('click', (e) => {
            this.onUploadDocument();
          });
          $('.viewDocument').on('click', (e) => {
            this.onViewDocument($(e.target).attr('receipt-id'));
          });
          $('.requestDocument').on('click', (e) => {
            this.onRequestingDocument($(e.target).attr('receipt-id'));
          });
        }
      };
    });
  }
  onUploadDocument() {
    this.router.navigate(['loan/uploaddocument/' + this.applicationData.AppID]);
  }
  onViewDocument(id) {
    this.router.navigate(['loan/viewdocument/' + this.applicationData.PropertyID + '/' + id+ '/' +this.applicationData.AppID]);
  }
  onRequestingDocument(id) {

  }
  Compaire() {
    return this.DocumentList.every(x => x.Status === 'Reviewed');
  }
}
