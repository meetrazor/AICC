import { Router } from '@angular/router';
import { CookieService } from './../../core/services/cookie.service';
import { GeneralService } from 'src/app/services/general.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  hoveredDate: NgbDate;
  currentUser: any;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  data: any;
  hidden: boolean;
  selected: any;
  color: string;
  isdropdownShow: boolean = false;
  isLoading: boolean;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild('dp', { static: true }) datePicker: any;

  // Select2 Dropdown
  selectValue: string[];
  constructor(private service: GeneralService, private cookie: CookieService, private router: Router) { }

  ngOnInit() {
    this.data = {
      PropertyManaged: 0
    };
    this.currentUser = JSON.parse(this.cookie.getCookie('currentUser'));
    // if (!this.currentUser.UserID) {
    //   this.router.navigate(['/account/login']);
    // }
    // if (this.currentUser.UserType) {
    //   this.router.navigate(['/loan']);
    // }
    // this.isLoading = true;
    // this.service.getDashboard().subscribe((res) => {
    //   this.data = res.data[0];
    //   this.isLoading = false;
    // });
    this.selected = '';
    this.hidden = true;
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.selected = this.fromDate.toLocaleDateString() + '-' + this.toDate.toLocaleDateString();

      this.dateRangeSelected.emit({ fromDate: this.fromDate, toDate: this.toDate });

      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;

    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    }
  }
  /**
   * Is hovered over date
   * @param date date obj
   */
  isHovered(date: NgbDate) {
    return this.fromNGDate && !this.toNGDate && this.hoveredDate && date.after(this.fromNGDate) && date.before(this.hoveredDate);
  }

  /**
   * @param date date obj
   */
  isInside(date: NgbDate) {
    return date.after(this.fromNGDate) && date.before(this.toNGDate);
  }

  /**
   * @param date date obj
   */
  isRange(date: NgbDate) {
    return date.equals(this.fromNGDate) || date.equals(this.toNGDate) || this.isInside(date) || this.isHovered(date);
  }
}
