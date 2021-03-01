import { Component, OnInit } from '@angular/core';

import { Orders } from './orders.model';

import { ordersData } from './data';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

/**
 * Orders component: handling the orders with sidebar and content
 */
export class OrdersComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  ordersData: Orders[];
  // page number
  page = 1;
  // default page size
  pageSize = 10;
  // total number of records
  totalRecords = 0;

  // start and end index
  startIndex = 1;
  endIndex = 10;

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'eCommerce', path: '/' }, { label: 'Orders', path: '/', active: true }];

    /**
     * fetches data
     */
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
    this.ordersData = ordersData.slice(this.startIndex - 1, this.endIndex - 1);
  }
  /**
   * fetches the orders value
   */
  private _fetchData() {
    this.ordersData = ordersData;
    this.totalRecords = ordersData.length;
  }
}
