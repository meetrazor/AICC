import { Component, OnInit } from '@angular/core';

import { Email } from './inbox.model';
import { emailData } from './data';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})

/**
 * Inbox component - handling the email inbox with sidebar and content
 */
export class InboxComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // paginated email data
  emailData: Array<Email>;

  // page number
  page = 1;
  // default page size
  pageSize = 15;
  // total number of records
  totalRecords = 0;

  // start and end index
  startIndex = 1;
  endIndex = 15;


  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Email', path: '/' }, { label: 'Inbox', path: '/', active: true }];

    // gets the data
    this._fetchData();
  }

  /**
   * Handle on page click event
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize + 1;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.emailData = emailData.slice(this.startIndex - 1, this.endIndex - 1);
  }

  /**
   * Gets the email data
   * Note: In real application - you might want to call some api to get the email records
   */
  private _fetchData() {
    this.emailData = emailData;
    this.totalRecords = emailData.length;
  }
}
