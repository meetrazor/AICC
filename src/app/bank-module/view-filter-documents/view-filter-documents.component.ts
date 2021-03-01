import { GeneralService } from './../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-filter-documents',
  templateUrl: './view-filter-documents.component.html',
  styleUrls: ['./view-filter-documents.component.scss']
})
export class ViewFilterDocumentsComponent implements OnInit {
  type: any;
  AppID: any;
  applicationData: any;
  loaded: boolean;
  breadCrumbItems: any;
  dtOptions: DataTables.Settings = {};
  constructor(private route: ActivatedRoute, private service: GeneralService, private router: Router) {
    this.type = this.route.snapshot.queryParams.type;
    this.AppID = this.route.snapshot.params.AppID;
    this.loaded = false;
  }

  ngOnInit() {
    this.service.GetApplicationInformation(this.AppID).subscribe((res) => {
      this.applicationData = res.data[0];
      this.breadCrumbItems = [{ label: 'Dashboard', path: '/' },
      { label: 'Applications', path: '/loan/applications' }, {
        label: `${this.applicationData.FirstName}
      ${this.applicationData.LastName}`, path: `/loan/title-search/${this.AppID}`
      },
      { label: 'Documents', path: '/', active: true }];
      this.loaded = true;
    });
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `loan/application/Documents/AppID/${this.AppID}?DocumentStatus=${this.type}` }
      , responsive: true,
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
          // if (row.Status === 'Pending') {
          //   return `<span class="badge badge-danger p-1">${row.Status}</span>`;
          // } else if (row.Status === 'Under Review') {
          //   return `<span class="badge badge-primary p-1">${row.Status}</span>`;
          // } else {
          //   return `<span class="badge badge-success p-1">${row.Status}</span>`;
          // }
          if (row.Status === 'Pending') {
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
  }
  onUploadDocument() {
    this.router.navigate(['loan/uploaddocument/' + this.applicationData.AppID]);
  }
  onViewDocument(id) {
    this.router.navigate(['loan/viewdocument/' + this.applicationData.PropertyID + '/' + id + '/' + this.applicationData.AppID]);
  }
  onRequestingDocument(id) {
  }
}
