import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  breadCrumbItems: Array<{}>;
  countData: any;
  isLoading: boolean;
  isdropdownShow: boolean;
  isFilterLoading: boolean;
  filterobj: {
    FilterStartDate: string,
    FilterEndDate: string,
    TypeOfLoan: number,
    LoanPropertyTypeID: number,
    ApplicationStatus: string,
    UserID: string,
    CompanyUserMasterID: string
  }
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  allLoanTypes: any;
  allStatus = ['iPVR sent', 'iPVR in Progress'];
  allProperty: any;
  allBanks = ['State Bank of India', 'Bank of Baroda', 'Union Bank of India', 'Canara Bank'];
  allIndia = ['Maharashtra', 'Punjab', 'Gujarat'];
  selected: any;
  hidden: boolean;
  ChartType: {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    datasets?: any;
    options?: any;
    toolbar?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    sparkline?: any;
  };
  ChartType2: {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    datasets?: any;
    options?: any;
    toolbar?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    sparkline?: any;
  };
  ChartType3: {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    datasets?: any;
    options?: any;
    toolbar?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    sparkline?: any;
  };
  // tslint:disable-next-line: variable-name
  user_type: number;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  dtOptions: DataTables.Settings = {};
  currentUser: any;
  loanTypeData: Array<any>;
  loanTypes: Array<string>;
  loanapp: Array<number>;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild('dp', { static: true }) datePicker: any;
  constructor(private router: Router, private service: GeneralService, private renderer: Renderer2, private datePipe: DatePipe) {
    this.isLoading = true;
    this.isFilterLoading = true;
  }

  ngOnInit() {
    this.isdropdownShow = false;
    this.currentUser = this.service.getcurrentUser();
    this.hidden = true;
    this.breadCrumbItems = [];
    this.loanTypes = [];
    this.loanapp = [];
    this.filterobj = {
      FilterStartDate: "",
      FilterEndDate: "",
      TypeOfLoan: null,
      LoanPropertyTypeID: null,
      ApplicationStatus: "",
      UserID: this.currentUser.UserID,
      CompanyUserMasterID: this.currentUser.CompanyUserMasterID
    }
    this.service.GetLoanPropertyTypes().subscribe((res) => {
      this.allProperty = res.data;
      this.service.GetLoanTypes().subscribe((data) => {
        this.allLoanTypes = data.data;
        this.service.GetLoanTypePVRStatus(this.currentUser.UserID).subscribe((Res) => {
          this.loanTypeData = Res.data;
          this.isLoading = false;
          this.loanTypeData.forEach((x) => {
            this.loanTypes.push(x.Type_of_Loan)
            this.loanapp.push(+x.Count_App_By_LoanType)
          })
          this.ChartType = {
            type: 'donut',
            height: 260,
            series: [42, 30, 28],
            labels: ['5 Lacs to 10 Lacs', 'Below 5 Lacs', 'Above 10 Lacs'],
            colors: ['#26c6e1', '#6658dd', '#ebeff2'],
            dataLabels: {
              enabled: true
            },
            legend: {
              show: false
            }, options: {
              maintainAspectRatio: false,
              cutoutPercentage: 70,
              legend: {
                display: true
              }
            }
          };
          this.ChartType2 = {
            type: 'donut',
            height: 260,
            series: this.loanapp,
            labels: this.loanTypes,
            colors: ['#26c6e1', '#6658dd', '#d9847e', '#ebeff2', '#9483de', '#7fe393'],
            dataLabels: {
              enabled: true
            },
            legend: {
              show: false
            }, options: {
              maintainAspectRatio: false,
              cutoutPercentage: 70,
              legend: {
                display: true
              }
            }
          };
          this.ChartType3 = {
            type: 'donut',
            height: 260,
            series: [400, 500, 200, 314, 314],
            labels: ['Buildings', 'Open Land', 'Bungalows', 'Flats', 'Factory'],
            colors: ['#26c6e1', '#6658dd', '#ebeff2', '#d9847e', '#9483de'],
            dataLabels: {
              enabled: true
            },
            legend: {
              show: false
            }, options: {
              maintainAspectRatio: false,
              cutoutPercentage: 70,
              legend: {
                display: true
              }
            }
          };

        })

      })
    })
    this.filterCount();
    if (this.currentUser.UserType === 'Bank Manager') {
      this.dtOptions = {
        ajax: { url: this.service.GetBaseUrl() + `loan/application/View/BankManager/${this.currentUser.UserID}` },
        columns: [{
          title: 'id',
          data: 'AppID'
        }, {
          title: 'Name',
          data: '', render: (data, type, row) => {
            return `${row.FirstName} ${row.LastName}`;

          }
        }, {
          title: 'Loan Type',
          data: 'Type_of_Loan'
        }, {
          title: 'Status',
          data: 'ApplicationStatus', render: (data) => {
            if (data === 'Pending') {
              return `<span class="badge badge-danger p-1">${data}</span>`;
            } else if (data === 'iPVR Sent') {
              return `<span class="badge badge-success p-1">${data}</span>`;
            } else if (data) {
              return `<span class="badge badge-secondary p-1">${data}</span>`;
            } else {
              return data;
            }
          }
        }, {
          title: 'Amount (₹)',
          data: 'LoanAmount'
        }, {
          title: 'Action',
          data: null, render: (data, type, row) => {
            if (row.FileURL) {
              return `<a class="btn text-primary" title="View Application"
              viewID = "${row.AppID}"><i class="mdi mdi-eye font-18 text-secondary" viewID = "${row.AppID}" aria-hidden="false"></i></a>
              <a href="${row.FileURL}" target="_blank" class="m-1" title="Download iPVR">
              <i class="mdi mdi-file-download font-18 text-secondary" aria-hidden="false"></i>
              </a>`;
            } else {
              return `<a class="btn text-primary" title="View Application"
              viewID = "${row.AppID}"><i class="mdi mdi-eye font-18 text-secondary" viewID = "${row.AppID}" aria-hidden="false"></i></a>`;
            }
            // return `<a href="loan/title-search/${row.AppID}">View</a>`;
          }
        }
        ], order: [[0, 'desc']], columnDefs: [{ targets: 0, visible: false }]
      };
    }


  }

  onDateSelection(date: NgbDate) {
    this.filterobj.FilterStartDate = '';
    this.filterobj.FilterEndDate = '';
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.selected = this.fromDate.toLocaleDateString() + '-' + this.toDate.toLocaleDateString();
      this.filterobj.FilterStartDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
      this.filterobj.FilterEndDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
      this.dateRangeSelected.emit({ fromDate: this.fromDate, toDate: this.toDate });
      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;
      this.filterCount();
    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    }
  }
  filterCount() {
    this.isFilterLoading = true;
    this.service.getLoanDashboard(this.filterobj).subscribe((res) => {
      this.countData = res.data;
      this.isFilterLoading = false;
    });
  }
  redirect() {
    // this.router.navigate(['/titlesearch/dashboard']);
  }
  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('viewID')) {
        this.router.navigate(['/loan/title-search/' + event.target.getAttribute('viewID')]);
      }
    });
  }
  callback() {
    this.selected = ''
    this.filterobj.FilterStartDate = '';
    this.filterobj.FilterEndDate = '';
    this.filterCount()
    this.hidden = true;
  }
  ChangeLoan(e) {
    if (e === undefined) {
      this.filterobj.TypeOfLoan = null
    } else {
      this.filterobj.TypeOfLoan = e
    }
    this.filterCount()
  }
  onstatusChange(e) {
    if (e === undefined) {
      this.filterobj.ApplicationStatus = null
    } else {
      this.filterobj.ApplicationStatus = e
    }
    this.filterCount()
  }
  ChangePropertyType(e) {
    if (e === undefined) {
      this.filterobj.LoanPropertyTypeID = null
    } else {
      this.filterobj.LoanPropertyTypeID = e
    }
    this.filterCount()
  }
}
