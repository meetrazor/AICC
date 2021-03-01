import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-themify',
  templateUrl: './themify.component.html',
  styleUrls: ['./themify.component.scss']
})

/**
 * Themify component - handling the themify icon with sidebar and content
 */
export class ThemifyComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Icons', path: '/' }, { label: 'Themify', path: '/', active: true }];

  }

}
