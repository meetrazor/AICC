import { Component, OnInit } from '@angular/core';

import { ChartType } from './chartjs.model';

import { lineAreaChart, lineBarChart, pieChart, donutChart, radarChart, reportChart } from './data';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})

/**
 * Chartjs component - handling the chartjs chart with sidebar and content
 */
export class ChartjsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Line Chart
  lineAreaChart: ChartType;
  // Bar Chart
  lineBarChart: ChartType;
  // Pie Chart
  pieChart: ChartType;
  // Donut Chart
  donutChart: ChartType;
  // Polar area Chart
  ScatterChart: ChartType;
  // Radar Chart
  radarChart: ChartType;
  // Financial Report
  reportChart: ChartType;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Charts', path: '/' }, { label: 'Chartjs', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the chartjs data
   */
  private _fetchData() {
    // Line Chart data
    this.lineAreaChart = lineAreaChart;
    // Bar Chart data
    this.lineBarChart = lineBarChart;
    // Pie Chart data
    this.pieChart = pieChart;
    // Donut Chart
    this.donutChart = donutChart;

    // Radar Chart data
    this.radarChart = radarChart;
    // Financial Report
    this.reportChart = reportChart;
  }

}
