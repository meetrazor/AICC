import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fontawesome',
  templateUrl: './fontawesome.component.html',
  styleUrls: ['./fontawesome.component.scss']
})

/**
 * Font-awesome component - handling the font awesome with sidebar and content
 */
export class FontawesomeComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Icons', path: '/' }, { label: 'Font Awesome', path: '/', active: true }];

  }

}
