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
  selector: 'app-view-fund',
  templateUrl: './view-fund.component.html',
  styleUrls: ['./view-fund.component.scss'],
})
export class ViewFundComponent implements OnInit {
  @Input() trustID: number;
  @Input() refresh: number;
  isdropdownShow: boolean;
  isLoading: boolean;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private datepipe: DatePipe,
    private service: GeneralService
  ) {
    this.isdropdownShow = false;
  }

  ngOnInit() {
    // console.log(this.trustID);
    this.isLoading = false;
    this.dtOptions = {
      ajax: {
        url: `${this.service.GetBaseUrl()}trust/Fund/list/${this.trustID}`,
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
          title: 'Fund Amount',
          data: 'FundAmount',
        },
        {
          title: 'Fund Reg.Date',
          data: null,
          render: (data) => {
            return this.datepipe.transform(
              data.FundRegisterDate,
              'MMM, dd yyyy'
            );
          },
        },
        {
          title: 'Fund Next Due.Date',
          data: null,
          render: (data) => {
            return this.datepipe.transform(
              data.FundNextDueDate,
              'MMM, dd yyyy'
            );
          },
        },
        {
          title: 'Fund Reg.Year',
          data: 'FinYear',
        },

        {
          title: 'Action',
          data: null,
          render(data) {
            return `<div style="display:flex">
            <a title="Download Fund Document" href="${data.FileUrl}">
            <i class="btn font-18 mdi mdi-cloud-download-outline text-secondary"></i></a></div>`;
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
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.refresh.firstChange) {
      this.rerender();
    }
  }
}
