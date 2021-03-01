import { Component, OnInit } from '@angular/core';

import { Widget, Project, ChartType } from './dashboard4.model';

import { incomeAmountAreaChart, statisticsBarChart, lifetimeDonutChart, widgetData, projectData } from './data';

@Component({
  selector: 'app-dashboard4',
  templateUrl: './dashboard4.component.html',
  styleUrls: ['./dashboard4.component.scss']
})

/**
 * Dashboard-4 component - handling the dashboard-4 with sidebar and content
 */
export class Dashboard4Component implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  lifetimeDonutChart: ChartType;
  statisticsBarChart: ChartType;
  incomeAmountAreaChart: ChartType;
  widgetData: Widget[];
  projectData: Project[];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Dashboard 4', path: '/', active: true }];

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
   * fetches the Dashboard-4 values
   */
  private _fetchData() {
    this.lifetimeDonutChart = lifetimeDonutChart;
    this.statisticsBarChart = statisticsBarChart;
    this.incomeAmountAreaChart = incomeAmountAreaChart;
    this.widgetData = widgetData;

    this.projectData = projectData;
  }
}
