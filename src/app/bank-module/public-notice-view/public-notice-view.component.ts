import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-notice-view',
  templateUrl: './public-notice-view.component.html',
  styleUrls: ['./public-notice-view.component.scss']
})
export class PublicNoticeViewComponent implements OnInit {
  breadCrumbItems: any;
  constructor() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Assignments', path: '/loan/assignment' },
    { label: 'Public Notice', path: '', active: true }];
  }

  ngOnInit() {
  }

}
