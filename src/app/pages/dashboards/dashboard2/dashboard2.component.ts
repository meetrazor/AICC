import { Component, OnInit } from '@angular/core';

import { Widget, Sellingproduct, ChartType } from './dashboard2.model';

import { widget, lifetimeSalesAreaChart, incomeAmountsLineChart, totalUsersPieChart, productData } from './data';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})

/**
 * Dashboard-2 component: handling the dashboard-2 with sidebar and content
 */
export class Dashboard2Component implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  widget: Widget[];
  productData: Sellingproduct[];

  lifetimeSalesAreaChart: ChartType;
  incomeAmountsLineChart: ChartType;
  totalUsersPieChart: ChartType;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Dashboard 2', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * content refresh
   */
  contentRefresh() {
    console.log('Data refresh requested');
  }


  /**
   * fetches the dashboard-2 data
   */
  private _fetchData() {

    this.widget = widget;

    this.lifetimeSalesAreaChart = lifetimeSalesAreaChart;
    this.incomeAmountsLineChart = incomeAmountsLineChart;
    this.totalUsersPieChart = totalUsersPieChart;
    this.productData = productData;
  }
}
