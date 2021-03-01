import { Component, OnInit } from '@angular/core';

import { Timeline } from './timeline.model';

import { timelineData } from './data';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

/**
 * Timeline component - handling the timeline with sidebar and content
 */
export class TimelineComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Timeline
  timelineData: Timeline[];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Extras', path: '/' }, { label: 'Timeline', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the timeline data
   */
  private _fetchData() {
    // Timeline Data
    this.timelineData = timelineData;
  }
}
