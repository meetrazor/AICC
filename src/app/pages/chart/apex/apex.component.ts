import { Component, OnInit } from '@angular/core';

import { ChartType } from './apex.model';

import {
  sparklineChart, sparklineSalesChart, sparklineExpensesChart, sparklineProfitsChart, linewithDataChart, gradientLineChart,
  stackedAreaChart, basicColumChart, basicBarChart, nagativeValueBarChart, lineColumAreaChart, multipleYAxisChart, simpleBubbleChart,
  scatterChart, simplePieChart, gradientDonutChart, patternedDonutChart, basicRadialBarChart, multipleRadialBars, strokedCircularGuage
} from './data';

@Component({
  selector: 'app-apex',
  templateUrl: './apex.component.html',
  styleUrls: ['./apex.component.scss']
})

/**
 * Apex component - handling the Apex chart with sidebar and content
 */
export class ApexComponent implements OnInit {

  // bread crumb data
  breadCrumbItems: Array<{}>;

  // sparkline chart common data
  sparklineChart: ChartType;

  // sparkline total sales chart
  sparklineSalesChart: ChartType;
  // sparkline expenses chart
  sparklineExpensesChart: ChartType;
  // sparkline profis chart
  sparklineProfitsChart: ChartType;

  // Line with datalabel chart
  linewithDataChart: ChartType;
  // Gradient line chart
  gradientLineChart: ChartType;
  // Stacked Area chart
  stackedAreaChart: ChartType;
  // Basic Colum Chart
  basicColumChart: ChartType;

  // Basic bar chart
  basicBarChart: ChartType;
  // Bar with Negative Values
  nagativeValueBarChart: ChartType;

  // Line column Area chart
  lineColumAreaChart: ChartType;
  // Multiple Y-Axis chart
  multipleYAxisChart: ChartType;

  // Simple Bubble chart
  simpleBubbleChart: ChartType;
  // Scatter chart
  scatterChart: ChartType;

  // Simple pie chart
  simplePieChart: ChartType;
  gradientDonutChart: ChartType;
  patternedDonutChart: ChartType;

  // RadialBar chart
  basicRadialBarChart: ChartType;
  multipleRadialBars: ChartType;
  strokedCircularGuage: ChartType;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Charts', path: '/' }, { label: 'Apex', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * content refresh
   */

  refreshContent() {
    console.log('Content refresh requested');
  }
  /**
   * fetches the apex chart data
   */
  private _fetchData() {

    // Sparkline chart data
    this.sparklineChart = sparklineChart;

    // sparkline total sales
    this.sparklineSalesChart = sparklineSalesChart;
    // sparkline expenses
    this.sparklineExpensesChart = sparklineExpensesChart;
    // sparkline profits
    this.sparklineProfitsChart = sparklineProfitsChart;

    // line with label chart
    this.linewithDataChart = linewithDataChart;
    // Gradient line chart
    this.gradientLineChart = gradientLineChart;

    // Stacked area chart data
    this.stackedAreaChart = stackedAreaChart;
    // Basic colum chart data
    this.basicColumChart = basicColumChart;

    // Basic bar chart data
    this.basicBarChart = basicBarChart;
    // Bar with Negative Values
    this.nagativeValueBarChart = nagativeValueBarChart;

    // Line column Area chart data
    this.lineColumAreaChart = lineColumAreaChart;
    // Multiple y axis chart data
    this.multipleYAxisChart = multipleYAxisChart;

    // Simple Bubble chart data
    this.simpleBubbleChart = simpleBubbleChart;
    // Scatter Chart
    this.scatterChart = scatterChart;

    // Pie Charts
    this.simplePieChart = simplePieChart;
    this.gradientDonutChart = gradientDonutChart;
    this.patternedDonutChart = patternedDonutChart;

    // RadialBar Charts
    this.basicRadialBarChart = basicRadialBarChart;
    this.multipleRadialBars = multipleRadialBars;
    this.strokedCircularGuage = strokedCircularGuage;
  }
}
