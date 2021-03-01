import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-notices',
  templateUrl: './public-notices.component.html',
  styleUrls: ['./public-notices.component.scss']
})
export class PublicNoticesComponent implements OnInit {
  breadCrumbItems:any;
  constructor() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Assignments', path: '/loan/assignment' },
    { label: 'Public Notice', path: '', active: true }];
   }

  ngOnInit() {
  }

}
