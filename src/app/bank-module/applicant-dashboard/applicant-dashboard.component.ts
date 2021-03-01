import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WindowRef } from '@agm/core/utils/browser-globals';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.scss']
})
export class ApplicantDashboardComponent implements OnInit, OnDestroy {
  breadCrumbItems: Array<{}>;
  interval;
  reviewd = 0;
  lawyerInfo: any;
  IsLawyerLoaded: boolean;
  index = 0;
  PVRData: any;
  PVRDetailsLoaded: boolean;
  statusList = ['Village Level Officer has received the request',
    'Village Level Officer has fetched the latest Govt. Land Records', 'Latest Land Record Document being uploaded',
    'Documents are under review by PropLegit', 'PVR getting finalized'];
  meth: any;
  totaldocument = 0;
  pending = 0;
  received = 0;
  AppID: any;
  dtOptions: DataTables.Settings = {};
  propertyDocumentData: any;
  loaded: boolean;
  applicationData: any;
  revenueRadialChart: any;

  constructor(
    private service: GeneralService, private Route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder) {
    this.AppID = this.Route.snapshot.params.id;
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  ngOnInit() {
    this.loaded = false;
    this.IsLawyerLoaded = false;
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' },
    { label: 'Applications', path: '/loan/applications' }, { label: 'Title Search', path: '/', active: true }];
    this.service.GetApplicationInformation(this.Route.snapshot.params.id).subscribe((res) => {
      this.applicationData = res.data[0];
      if (this.applicationData.PVRDocumentID === null) {
        this.PVRDetailsLoaded = false;
        this.statusChange();
      } else {
        this.service.GetPVRData(this.Route.snapshot.params.id).subscribe((PVRData) => {
          this.PVRDetailsLoaded = true;
          this.PVRData = PVRData.data;
        });
      }
      if (this.applicationData.LawyerID) {
        this.service.viewLawyer(this.applicationData.LawyerID).subscribe((lawyerInfo) => {
          this.lawyerInfo = lawyerInfo.data[0];
          this.IsLawyerLoaded = true;
        });
      }
      this.service.GetDocumentList(this.Route.snapshot.params.id).subscribe((Response) => {
        this.propertyDocumentData = Response.data;
        if (this.propertyDocumentData.length > 0) {
          this.propertyDocumentData.filter((data) => {
            this.totaldocument++;
            if (data.Status === 'Pending') {
              this.pending++;
            } else {
              this.received++;
            }
            // if (data.Status === 'Under Review') {
            //   this.received++;
            // } else if (data.Status === 'Reviewed') {
            //   this.reviewd++;
            // } else if (data.Status === 'Pending') {
            //   this.pending++;
            // }
          });
        }
        this.LoadChart();
        this.loaded = true;
      });
    });
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `loan/application/Documents/AppID/${this.Route.snapshot.params.id}` }, responsive: true,
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
          // btn += '<a href="javascript:void(0)" class="requestDocument m-1" title="Request this Document" receipt-id="' + data.ID + '">';
          // btn += '<i class="mdi mdi mdi-file-question font-18 text-secondary" aria-hidden="false" receipt-id="' + data.ID + '"></i>';
          // btn += '</a>';
        } else if (data.FileURL !== null) {
          btn += '<a href="javascript:void(0)" class="viewDocument m-1" title="View Document" receipt-id="' + data.DocumentID + '">';
          btn += '<i class="mdi mdi-eye font-18 text-secondary" aria-hidden="false" receipt-id="' + data.DocumentID + '"></i>';
          btn += '</a>';
          if (data.Status !== 'Reviewed') {
            btn += '<a href="' + data.FileURL + '" class="m-1" title="Download This Document">';
            btn += '<i class="mdi mdi-file-download font-18 text-secondary" aria-hidden="false"></i>';
            btn += '</a>';
            // btn += '<a href="javascript:void(0)" class="requestDocument m-1" title="Request this Document" receipt-id="' + data.ID + '">';
            // btn += '<i class="mdi mdi mdi-file-question font-18 text-secondary" aria-hidden="false" receipt-id="' + data.ID + '"></i>';
            // btn += '</a>';
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
  statusChange() {
    this.interval = setInterval(() => {
      this.index++;
      document.getElementById('status').innerHTML = this.statusList[this.index];
      if ((this.index + 1) >= this.statusList.length) {
        clearInterval(this.interval);
      }
    }, 30000);
  }
  onUploadDocument() {
    this.router.navigate(['loan/uploaddocument/' + this.applicationData.AppID]);
  }
  onViewDocument(id) {
    let path = window.location.origin + '/loan/viewdocument/' + this.applicationData.PropertyID + '/' + id + '/' + this.applicationData.AppID
    // this.router.navigate(['loan/viewdocument/' + this.applicationData.PropertyID + '/' + id + '/' + this.applicationData.AppID]);
    window.open(path, '_black')
    // this.router.navigate(['loan/viewdocument/' + this.applicationData.PropertyID + '/' + id]);
    // this.service.getDocument(this.applicationData.PropertyID, id).subscribe((res) => {
    //   if (res.status === 200) {
    //     const data = res.data[0];
    //     if (data) {
    //       if (data.FileType === 'DOC') {
    //         window.location.href = data.FileURL;
    //       } else {
    //         this.router.navigate(['loan/viewdocument', data.FileURL, data.FileType]);
    //       }
    //     } else {
    //       Swal.fire({
    //         title: 'Error',
    //         text: 'Something\'s Wrong',
    //         type: 'error'
    //       });
    //     }
    //   }
    // });
  }
  onRequestingDocument(id) {
    console.log('Requesting ' + id);

  }
  LoadChart() {
    this.revenueRadialChart = {
      chart: {
        height: 200,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '65%',
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              fontSize: '24px',
              color: 'rgb(29, 173, 56)',
              offsetY: 10,
              formatter: (val) => {
                return val + '';
              }
            }
          }
        }
      },
      colors: ['rgb(29, 173, 56)'],
      series: [this.totaldocument ? (((this.received >= 3 ? 3 : this.received) / 3) * 100).toFixed() : 0],
      stroke: {
        lineCap: 'round',
      },
    };
  }
  EcChange() {
    this.loaded = false;
    this.service.ChangeECResponce(this.AppID).subscribe(() => {
      this.loaded = true;
      Swal.fire({
        title: 'Request Received',
        text: 'EC will be delivered shortly',
        type: 'success',
      }).then(() => { location.reload() })

    })
  }
}
