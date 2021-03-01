import { Component, OnInit } from '@angular/core';

import { Buttons, Icons, IconButton } from './buttons.model';

import { buttonData, iconData, iconButton } from './data';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})

/**
 * Buttons component - handling the Buttons with sidebar and content
 */
export class ButtonsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Buttons data
  buttonData: Buttons[];
  iconData: Icons[];
  iconButton: IconButton[];

  // Button Group Data
  model = {
    left: true,
    middle: false,
    right: false
  };

  btnmodel = {
    first: true,
    second: false,
    third: false,
    forth: false
  };

  btngroup = {
    first: true,
    second: false,
    third: false,
    drop: false
  };

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'UI Elements', path: '/' }, { label: 'Buttons', path: '/', active: true }];

    /**
     * Fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the button value
   */
  private _fetchData() {

    // Button Data
    this.buttonData = buttonData;
    // Icon Button Data
    this.iconData = iconData;
    // Button with Icon and name
    this.iconButton = iconButton;
  }
}
