import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-view-exam-certificate',
  templateUrl: './view-exam-certificate.component.html',
  styleUrls: ['./view-exam-certificate.component.scss'],
})
export class ViewExamCertificateComponent implements OnInit {
  @Input() trustID: number;
  @Input() refresh: number;
  isdropdownShow: boolean;
  isLoading: boolean;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  data: any[];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private datepipe: DatePipe,
    private service: GeneralService
  ) {
    this.isdropdownShow = false;
  }

  ngOnInit() {
    this.dtOptions = {
      data: this.data,
      ajax: {
        url: `${this.service.GetBaseUrl()}trust/ExemCertificate/list/${
          this.trustID
        }`,
      },
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
              data.DateofCertificate,
              'MMM, dd yyyy'
            );
          },
        },
        {
          title: 'Year',
          data: 'FinYear',
        },
        {
          title: 'Next Renewal Date',
          data: null,
          render: (data) => {
            return this.datepipe.transform(
              data.NextRenewalDate,
              'MMM, dd yyyy'
            );
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
    // this.renderer.listen('document', 'click', (event) => {
    //   if (event.target.hasAttribute('viewpropertyID')) {
    //     this.router.navigate([
    //       'property/view/' + event.target.getAttribute('viewpropertyID'),
    //     ]);
    //   }
    // });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.refresh.firstChange) {
      this.rerender();
    }
  }
}
