import { Component, OnInit } from '@angular/core';

import { Ribbon } from './ribbons.model';

import { ribbonsData } from './data';

@Component({
  selector: 'app-ribbons',
  templateUrl: './ribbons.component.html',
  styleUrls: ['./ribbons.component.scss']
})

/**
 * Ribbons component - handling the ribbons with sidebar and content
 */
export class RibbonsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // ribbon data
  ribbonsData: Ribbon[];
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'UI Elements', path: '/' }, { label: 'Ribbons', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the ribbon value
   */
  private _fetchData() {
    // Ribbon data fetch
    this.ribbonsData = ribbonsData;
  }
}
