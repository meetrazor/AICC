import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: ['./spinners.component.scss']
})

/**
 * Spinners component - handling the spinner with sidebar and content
 */
export class SpinnersComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'UI Elements', path: '/' }, { label: 'Spinners', path: '/', active: true }];

  }

}
