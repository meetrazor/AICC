import { Component, OnInit } from '@angular/core';

import { Slider } from './rangeslider.model';

import { sliderData } from './data';

@Component({
  selector: 'app-rangeslider',
  templateUrl: './rangeslider.component.html',
  styleUrls: ['./rangeslider.component.scss']
})

/**
 * Range slider component - handling the ranger-slider with sidebar and content
 */
export class RangesliderComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // slider data
  sliderData: Slider[];

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Admin UI', path: '/' }, { label: 'Range Slider', path: '/', active: true }];
    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the slider values
   */
  private _fetchData() {
    // slider data
    this.sliderData = sliderData;
  }
}
