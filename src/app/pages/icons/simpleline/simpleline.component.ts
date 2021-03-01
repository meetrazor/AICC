import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simpleline',
  templateUrl: './simpleline.component.html',
  styleUrls: ['./simpleline.component.scss']
})

/**
 * Simpleline component - handling the Simpleline icon with sidebar and content
 */
export class SimplelineComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Icons', path: '/' }, { label: 'Simple Line', path: '/', active: true }];

  }

}
