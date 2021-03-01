import { Component, OnInit } from '@angular/core';

import { Widgets, Contacts, ChartType } from './dashboard.model';

import { widgetsData, analyticsLineChart, averagetimeBarChart, contactsData, salesDonutChart } from './data';

@Component({
  selector: 'app-crmdashboard',
  templateUrl: './crmdashboard.component.html',
  styleUrls: ['./crmdashboard.component.scss']
})

/**
 * CRM dashboard component - handling the CRM-dashboard with sidebar and content
 */
export class CrmdashboardComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  widgetsData: Widgets[];
  contactsData: Contacts[];

  analyticsLineChart: ChartType;
  averagetimeBarChart: ChartType;
  salesDonutChart: ChartType;
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'CRM', path: '/' }, { label: 'Dashboard', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the dashboard value
   */
  private _fetchData() {
    this.widgetsData = widgetsData;
    this.analyticsLineChart = analyticsLineChart;
    this.averagetimeBarChart = averagetimeBarChart;
    this.contactsData = contactsData;
    this.salesDonutChart = salesDonutChart;
  }
}
