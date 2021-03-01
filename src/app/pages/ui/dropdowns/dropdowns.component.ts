import { Component, OnInit } from '@angular/core';

import { colorData } from './data';

import { Dropdown } from './dropdowns.model';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})

/**
 * Dropdowns component - handling the dropdowns with sidebar and content
 */
export class DropdownsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  colorData: Dropdown[];
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'UI Elements', path: '/' }, { label: 'Dropdowns', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the dropdown value
   */
  private _fetchData() {
    this.colorData = colorData;
  }
}
